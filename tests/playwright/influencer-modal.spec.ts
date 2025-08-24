import { test, expect, ConsoleMessage } from '@playwright/test';

// Type definitions for console messages
interface ConsoleLog {
  type: string;
  text: string;
  url?: string;
  lineNumber?: number;
  columnNumber?: number;
  timestamp: Date;
}

test.describe('Influencer Type Modal Tests', () => {
  let consoleMessages: ConsoleLog[] = [];
  let consoleErrors: ConsoleLog[] = [];
  let consoleWarnings: ConsoleLog[] = [];

  test.beforeEach(async ({ page }) => {
    // Clear console message arrays before each test
    consoleMessages = [];
    consoleErrors = [];
    consoleWarnings = [];

    // Set up console message listeners
    page.on('console', (msg: ConsoleMessage) => {
      const type = msg.type();
      const location = msg.location();
      const logEntry: ConsoleLog = {
        type,
        text: msg.text(),
        url: location?.url,
        lineNumber: location?.lineNumber,
        columnNumber: location?.columnNumber,
        timestamp: new Date()
      };

      // Store all messages
      consoleMessages.push(logEntry);

      // Categorize by type
      if (type === 'error') {
        consoleErrors.push(logEntry);
        console.error(`[CONSOLE ERROR] ${logEntry.text}`, location ? `at ${location.url}:${location.lineNumber}:${location.columnNumber}` : '');
      } else if (type === 'warning' || type === 'warn') {
        consoleWarnings.push(logEntry);
        console.warn(`[CONSOLE WARNING] ${logEntry.text}`, location ? `at ${location.url}:${location.lineNumber}:${location.columnNumber}` : '');
      } else if (type === 'log') {
        console.log(`[CONSOLE LOG] ${logEntry.text}`);
      } else if (type === 'info') {
        console.info(`[CONSOLE INFO] ${logEntry.text}`);
      } else if (type === 'debug') {
        console.debug(`[CONSOLE DEBUG] ${logEntry.text}`);
      }
    });

    // Also capture page errors (uncaught exceptions)
    page.on('pageerror', (error) => {
      const errorLog: ConsoleLog = {
        type: 'pageerror',
        text: error.message,
        timestamp: new Date()
      };
      consoleErrors.push(errorLog);
      console.error(`[PAGE ERROR] ${error.message}`);
    });

    // Capture request failures
    page.on('requestfailed', (request) => {
      const errorLog: ConsoleLog = {
        type: 'requestfailed',
        text: `Request failed: ${request.url()} - ${request.failure()?.errorText}`,
        url: request.url(),
        timestamp: new Date()
      };
      consoleErrors.push(errorLog);
      console.error(`[REQUEST FAILED] ${request.url()} - ${request.failure()?.errorText}`);
    });
  });

  test.afterEach(async () => {
    // Generate comprehensive console report after each test
    console.log('\n========== CONSOLE MESSAGE SUMMARY ==========');
    console.log(`Total Messages: ${consoleMessages.length}`);
    console.log(`Errors: ${consoleErrors.length}`);
    console.log(`Warnings: ${consoleWarnings.length}`);
    console.log(`Other: ${consoleMessages.length - consoleErrors.length - consoleWarnings.length}`);
    
    if (consoleErrors.length > 0) {
      console.log('\n========== CONSOLE ERRORS DETAIL ==========');
      consoleErrors.forEach((error, index) => {
        console.log(`\nError ${index + 1}:`);
        console.log(`  Type: ${error.type}`);
        console.log(`  Message: ${error.text}`);
        if (error.url) {
          console.log(`  Location: ${error.url}:${error.lineNumber}:${error.columnNumber}`);
        }
        console.log(`  Timestamp: ${error.timestamp.toISOString()}`);
      });
    }

    if (consoleWarnings.length > 0) {
      console.log('\n========== CONSOLE WARNINGS DETAIL ==========');
      consoleWarnings.forEach((warning, index) => {
        console.log(`\nWarning ${index + 1}:`);
        console.log(`  Type: ${warning.type}`);
        console.log(`  Message: ${warning.text}`);
        if (warning.url) {
          console.log(`  Location: ${warning.url}:${warning.lineNumber}:${warning.columnNumber}`);
        }
        console.log(`  Timestamp: ${warning.timestamp.toISOString()}`);
      });
    }

    console.log('\n========================================\n');
  });

  test('Modal appears on first visit and Crypto Influencer selection works', async ({ page }) => {
    // Navigate to the page
    await page.goto('/', { waitUntil: 'networkidle' });

    // Wait for the modal to appear
    const modal = page.locator('[role="dialog"], [aria-modal="true"], .modal, [data-modal="influencer-type"]');
    await expect(modal).toBeVisible({ timeout: 10000 });

    // Take a screenshot of the modal
    await page.screenshot({ path: 'tests/playwright/screenshots/modal-initial.png', fullPage: true });

    // Check modal content
    const modalTitle = modal.locator('h2, h3, [class*="title"], [class*="heading"]').first();
    await expect(modalTitle).toContainText(/choose|select|influencer/i, { timeout: 5000 });

    // Find and click the Crypto Influencer button
    const cryptoButton = modal.locator('button, [role="button"]').filter({ hasText: /crypto/i });
    await expect(cryptoButton).toBeVisible();
    
    // Log button details
    const cryptoButtonText = await cryptoButton.textContent();
    console.log(`[TEST] Found Crypto button with text: "${cryptoButtonText}"`);

    // Click the Crypto Influencer button
    await cryptoButton.click();

    // Wait for modal to disappear
    await expect(modal).toBeHidden({ timeout: 5000 });

    // Verify theme has changed (check for crypto-specific elements or classes)
    await page.waitForTimeout(1000); // Brief wait for theme to apply

    // Check for crypto theme indicators
    const body = page.locator('body');
    const bodyClasses = await body.getAttribute('class');
    const dataTheme = await body.getAttribute('data-theme');
    const htmlTheme = await page.locator('html').getAttribute('data-theme');

    console.log(`[TEST] Body classes after crypto selection: ${bodyClasses}`);
    console.log(`[TEST] Body data-theme: ${dataTheme}`);
    console.log(`[TEST] HTML data-theme: ${htmlTheme}`);

    // Take screenshot after selection
    await page.screenshot({ path: 'tests/playwright/screenshots/after-crypto-selection.png', fullPage: true });

    // Check localStorage or cookies for persisted selection
    const localStorage = await page.evaluate(() => {
      return Object.entries(window.localStorage);
    });
    console.log('[TEST] LocalStorage after selection:', localStorage);

    // Check if theme preference is stored
    const themeStored = localStorage.some(([key, value]) => 
      key.includes('theme') || key.includes('influencer') || value.includes('crypto')
    );
    expect(themeStored).toBeTruthy();

    // Verify no console errors occurred during the process
    expect(consoleErrors.length).toBe(0);
  });

  test('Modal appears on first visit and General Influencer selection works', async ({ page, context }) => {
    // Clear cookies and localStorage to simulate fresh visit
    await context.clearCookies();
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    
    // Navigate to the page
    await page.goto('/', { waitUntil: 'networkidle' });

    // Wait for the modal to appear
    const modal = page.locator('[role="dialog"], [aria-modal="true"], .modal, [data-modal="influencer-type"]');
    await expect(modal).toBeVisible({ timeout: 10000 });

    // Find and click the General Influencer button
    const generalButton = modal.locator('button, [role="button"]').filter({ hasText: /general/i });
    await expect(generalButton).toBeVisible();
    
    // Log button details
    const generalButtonText = await generalButton.textContent();
    console.log(`[TEST] Found General button with text: "${generalButtonText}"`);

    // Click the General Influencer button
    await generalButton.click();

    // Wait for modal to disappear
    await expect(modal).toBeHidden({ timeout: 5000 });

    // Verify theme has changed (check for general theme elements or classes)
    await page.waitForTimeout(1000); // Brief wait for theme to apply

    // Check for general theme indicators
    const body = page.locator('body');
    const bodyClasses = await body.getAttribute('class');
    const dataTheme = await body.getAttribute('data-theme');
    const htmlTheme = await page.locator('html').getAttribute('data-theme');

    console.log(`[TEST] Body classes after general selection: ${bodyClasses}`);
    console.log(`[TEST] Body data-theme: ${dataTheme}`);
    console.log(`[TEST] HTML data-theme: ${htmlTheme}`);

    // Take screenshot after selection
    await page.screenshot({ path: 'tests/playwright/screenshots/after-general-selection.png', fullPage: true });

    // Check localStorage for persisted selection
    const localStorage = await page.evaluate(() => {
      return Object.entries(window.localStorage);
    });
    console.log('[TEST] LocalStorage after selection:', localStorage);

    // Check if theme preference is stored
    const themeStored = localStorage.some(([key, value]) => 
      key.includes('theme') || key.includes('influencer') || value.includes('general')
    );
    expect(themeStored).toBeTruthy();

    // Verify no console errors occurred during the process
    expect(consoleErrors.length).toBe(0);
  });

  test('Modal does not appear on subsequent visits after selection', async ({ page, context }) => {
    // First visit - make a selection
    await page.goto('/', { waitUntil: 'networkidle' });
    
    const modal = page.locator('[role="dialog"], [aria-modal="true"], .modal, [data-modal="influencer-type"]');
    await expect(modal).toBeVisible({ timeout: 10000 });
    
    // Select Crypto Influencer
    const cryptoButton = modal.locator('button, [role="button"]').filter({ hasText: /crypto/i });
    await cryptoButton.click();
    await expect(modal).toBeHidden({ timeout: 5000 });

    // Second visit - modal should not appear
    await page.reload({ waitUntil: 'networkidle' });
    
    // Wait briefly to ensure modal would have time to appear if it was going to
    await page.waitForTimeout(3000);
    
    // Modal should not be visible
    await expect(modal).not.toBeVisible();

    // Verify the selection is persisted
    const localStorage = await page.evaluate(() => {
      return Object.entries(window.localStorage);
    });
    console.log('[TEST] LocalStorage on second visit:', localStorage);

    // Take screenshot to verify no modal
    await page.screenshot({ path: 'tests/playwright/screenshots/second-visit-no-modal.png', fullPage: true });

    // Verify no console errors
    expect(consoleErrors.length).toBe(0);
  });

  test('Comprehensive console error detection and reporting', async ({ page }) => {
    // Navigate and capture all console activity
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Wait for any async operations to complete
    await page.waitForTimeout(5000);
    
    // Trigger various interactions to potentially expose more console errors
    const modal = page.locator('[role="dialog"], [aria-modal="true"], .modal, [data-modal="influencer-type"]');
    
    if (await modal.isVisible()) {
      // Take screenshot of any visible errors
      await page.screenshot({ path: 'tests/playwright/screenshots/console-errors-check.png', fullPage: true });
      
      // Try both button selections to trigger any related errors
      const buttons = await modal.locator('button, [role="button"]').all();
      console.log(`[TEST] Found ${buttons.length} buttons in modal`);
      
      for (const button of buttons) {
        const text = await button.textContent();
        console.log(`[TEST] Button text: "${text}"`);
      }
    }

    // Check for specific error patterns
    const hydrationErrors = consoleErrors.filter(e => 
      e.text.toLowerCase().includes('hydration') || 
      e.text.toLowerCase().includes('mismatch')
    );
    
    const reactErrors = consoleErrors.filter(e => 
      e.text.toLowerCase().includes('react') || 
      e.text.toLowerCase().includes('component')
    );
    
    const networkErrors = consoleErrors.filter(e => 
      e.type === 'requestfailed' || 
      e.text.toLowerCase().includes('failed to fetch') ||
      e.text.toLowerCase().includes('network')
    );

    // Report findings
    console.log('\n========== ERROR ANALYSIS ==========');
    console.log(`Hydration Errors: ${hydrationErrors.length}`);
    console.log(`React Errors: ${reactErrors.length}`);
    console.log(`Network Errors: ${networkErrors.length}`);
    
    if (hydrationErrors.length > 0) {
      console.log('\nHydration Errors:');
      hydrationErrors.forEach(e => console.log(`  - ${e.text}`));
    }
    
    if (reactErrors.length > 0) {
      console.log('\nReact Errors:');
      reactErrors.forEach(e => console.log(`  - ${e.text}`));
    }
    
    if (networkErrors.length > 0) {
      console.log('\nNetwork Errors:');
      networkErrors.forEach(e => console.log(`  - ${e.text}`));
    }

    // Generate detailed report
    const report = {
      totalMessages: consoleMessages.length,
      errors: consoleErrors.length,
      warnings: consoleWarnings.length,
      errorDetails: consoleErrors,
      warningDetails: consoleWarnings,
      timestamp: new Date().toISOString()
    };

    // Save report to file
    await page.evaluate((reportData) => {
      console.log('DETAILED CONSOLE REPORT:', JSON.stringify(reportData, null, 2));
    }, report);

    // The test will pass but report all findings
    // You can make it fail if there are errors by uncommenting the next line:
    // expect(consoleErrors.length).toBe(0);
  });
});