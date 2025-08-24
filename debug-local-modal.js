const { chromium } = require('playwright');

(async () => {
  console.log('🔍 DEBUGGING LOCAL MODAL - Step by step analysis...');
  
  const browser = await chromium.launch({ 
    headless: false,
    devtools: true,
    slowMo: 1000
  });
  
  const page = await browser.newPage();

  // Capture ALL console messages
  const allMessages = [];
  page.on('console', msg => {
    const message = `[${msg.type().toUpperCase()}] ${msg.text()}`;
    allMessages.push(message);
    console.log(message);
  });

  // Capture page errors
  page.on('pageerror', error => {
    console.log(`💥 PAGE ERROR: ${error.message}`);
  });

  try {
    console.log('🌐 Step 1: Opening http://localhost:3000...');
    await page.goto('http://localhost:3000');
    
    console.log('🧹 Step 2: Clearing localStorage...');
    await page.evaluate(() => {
      try {
        localStorage.clear();
        console.log('✅ localStorage cleared successfully');
        return true;
      } catch (e) {
        console.log('❌ localStorage clear failed:', e);
        return false;
      }
    });
    
    console.log('🔄 Step 3: Reloading page...');
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    console.log('⏳ Step 4: Waiting and checking for components...');
    await page.waitForTimeout(3000);
    
    // Check if React is loaded
    const reactLoaded = await page.evaluate(() => {
      return typeof window.React !== 'undefined' || document.querySelector('[data-reactroot]') !== null;
    });
    console.log(`🔍 React loaded: ${reactLoaded ? '✅' : '❌'}`);
    
    // Check if ThemeProvider context exists
    const themeProviderCheck = await page.evaluate(() => {
      // Try to find any elements that would indicate ThemeProvider is working
      const themeElements = document.querySelectorAll('[data-testid], [role="dialog"]');
      return {
        hasThemeElements: themeElements.length > 0,
        elementCount: themeElements.length,
        bodyClasses: document.body.className,
        htmlContent: document.documentElement.innerHTML.includes('ThemeProvider') || 
                     document.documentElement.innerHTML.includes('InfluencerTypeModal')
      };
    });
    console.log('🎨 ThemeProvider check:', themeProviderCheck);
    
    // Check for modal with multiple selectors
    const modalChecks = {
      'data-testid': await page.locator('[data-testid="influencer-type-modal"]').isVisible(),
      'role=dialog': await page.locator('[role="dialog"]').isVisible(),
      'aria-modal': await page.locator('[aria-modal="true"]').isVisible(),
      'fixed positioning': await page.locator('.fixed.inset-0').isVisible()
    };
    
    console.log('🔍 Modal visibility checks:');
    Object.entries(modalChecks).forEach(([selector, isVisible]) => {
      console.log(`  - ${selector}: ${isVisible ? '✅ visible' : '❌ not found'}`);
    });
    
    const anyModalVisible = Object.values(modalChecks).some(v => v);
    
    if (!anyModalVisible) {
      console.log('❌ NO MODAL FOUND! Debugging further...');
      
      // Check if there are any React components at all
      const componentCheck = await page.evaluate(() => {
        const allElements = document.querySelectorAll('*');
        let reactElements = 0;
        let suspiciousElements = [];
        
        Array.from(allElements).forEach(el => {
          if (el.hasAttribute('data-reactroot') || 
              el.className.includes('react') ||
              el._reactInternalFiber ||
              el._reactInternalInstance) {
            reactElements++;
          }
          
          if (el.textContent && (
              el.textContent.includes('Welcome to X Dub') ||
              el.textContent.includes('Crypto Influencer') ||
              el.textContent.includes('General Influencer')
            )) {
            suspiciousElements.push({
              tagName: el.tagName,
              textContent: el.textContent.substring(0, 100),
              className: el.className,
              visible: getComputedStyle(el).display !== 'none'
            });
          }
        });
        
        return {
          reactElements,
          suspiciousElements,
          totalElements: allElements.length,
          bodyInnerHTML: document.body.innerHTML.substring(0, 500) + '...'
        };
      });
      
      console.log('🔍 Component analysis:', componentCheck);
      
      // Take screenshot for visual debugging
      await page.screenshot({ 
        path: 'local-debug-screenshot.png', 
        fullPage: true 
      });
      console.log('📸 Debug screenshot saved: local-debug-screenshot.png');
      
    } else {
      console.log('✅ MODAL FOUND! It should be visible in the browser.');
    }
    
    console.log('\n📝 All console messages:');
    allMessages.forEach((msg, i) => {
      console.log(`${i+1}. ${msg}`);
    });
    
    // Keep browser open for manual inspection
    console.log('\n👀 Browser staying open for manual inspection...');
    console.log('Check the browser window and DevTools console');
    console.log('Press Ctrl+C when done investigating');
    
    await new Promise(() => {}); // Keep running
    
  } catch (error) {
    console.error('❌ Debug error:', error);
  } finally {
    // Browser will stay open
  }
})();