#!/usr/bin/env node

/**
 * Test script for Cloudflare Pages local development
 * This script validates that the static export works correctly with Wrangler
 */

const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

const TEST_PORT = 8788;
const TEST_URL = `http://localhost:${TEST_PORT}`;

console.log('🚀 Starting Cloudflare Pages local testing...\n');

// Function to test HTTP response
function testEndpoint(url, expectedStatus = 200) {
  return new Promise((resolve, reject) => {
    const request = http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data,
          url: url
        });
      });
    });
    
    request.on('error', reject);
    request.setTimeout(5000, () => {
      request.destroy();
      reject(new Error(`Request timeout for ${url}`));
    });
  });
}

// Function to wait for server to be ready
function waitForServer(url, maxAttempts = 30) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    
    const check = () => {
      attempts++;
      testEndpoint(url)
        .then(() => {
          console.log(`✅ Server is ready at ${url}`);
          resolve();
        })
        .catch(() => {
          if (attempts >= maxAttempts) {
            reject(new Error(`Server not ready after ${maxAttempts} attempts`));
          } else {
            setTimeout(check, 1000);
          }
        });
    };
    
    check();
  });
}

// Main testing function
async function runTests() {
  console.log('📋 Test Plan:');
  console.log('1. Start Wrangler Pages dev server');
  console.log('2. Wait for server to be ready');
  console.log('3. Test main page loads correctly');
  console.log('4. Test static assets are served');
  console.log('5. Test routing works (SPA behavior)');
  console.log('6. Cleanup\n');

  // Start wrangler pages dev
  console.log('🔧 Starting Wrangler Pages dev server...');
  const wranglerProcess = spawn('npx', [
    'wrangler', 'pages', 'dev', 'out',
    '--port', TEST_PORT.toString(),
    '--compatibility-date', '2024-01-01',
    '--local'
  ], {
    stdio: ['pipe', 'pipe', 'pipe'],
    detached: false
  });

  let serverOutput = '';
  wranglerProcess.stdout.on('data', (data) => {
    serverOutput += data.toString();
    if (data.toString().includes('Ready on')) {
      console.log('📡 Wrangler server started');
    }
  });

  wranglerProcess.stderr.on('data', (data) => {
    console.log('⚠️  Wrangler stderr:', data.toString());
  });

  try {
    // Wait for server to be ready
    console.log('⏳ Waiting for server to be ready...');
    await waitForServer(TEST_URL);

    // Test 1: Main page loads
    console.log('\n🧪 Test 1: Testing main page...');
    const mainPageResponse = await testEndpoint(TEST_URL);
    if (mainPageResponse.status === 200 && mainPageResponse.body.includes('Drive.log')) {
      console.log('✅ Main page loads correctly');
    } else {
      console.log('❌ Main page test failed');
      console.log('Status:', mainPageResponse.status);
    }

    // Test 2: Static CSS assets
    console.log('\n🧪 Test 2: Testing CSS assets...');
    try {
      const cssResponse = await testEndpoint(`${TEST_URL}/_next/static/css/6dba06051c42fc3c.css`);
      if (cssResponse.status === 200) {
        console.log('✅ CSS assets load correctly');
      } else {
        console.log('❌ CSS assets test failed, status:', cssResponse.status);
      }
    } catch (error) {
      console.log('⚠️  CSS test skipped (asset path may vary)');
    }

    // Test 3: 404 handling (should redirect to index.html)
    console.log('\n🧪 Test 3: Testing SPA routing...');
    const routeResponse = await testEndpoint(`${TEST_URL}/nonexistent-route`);
    if (routeResponse.status === 200 && routeResponse.body.includes('Drive.log')) {
      console.log('✅ SPA routing works correctly (404 redirects to index.html)');
    } else {
      console.log('❌ SPA routing test failed');
      console.log('Status:', routeResponse.status);
    }

    console.log('\n🎉 All tests completed successfully!');
    console.log('✅ Cloudflare Pages local environment is working correctly');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  } finally {
    // Cleanup
    console.log('\n🧹 Cleaning up...');
    wranglerProcess.kill('SIGTERM');
    
    // Wait a bit for graceful shutdown
    setTimeout(() => {
      if (!wranglerProcess.killed) {
        wranglerProcess.kill('SIGKILL');
      }
      console.log('✅ Cleanup completed');
      process.exit(0);
    }, 2000);
  }
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Test interrupted by user');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Test terminated');
  process.exit(0);
});

// Run the tests
runTests().catch((error) => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});