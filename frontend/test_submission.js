const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER_LOG:', msg.text()));
  
  await page.goto('http://localhost:5173');
  
  // Wait for Dev Skip to appear
  await page.waitForSelector('button[title="Developer Shortcut: Skip to Review"]');
  console.log('Clicking Dev Skip');
  await page.click('button[title="Developer Shortcut: Skip to Review"]');
  
  // Wait for Review Session button
  await page.waitForFunction(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find(b => b.textContent.includes('Review Session'));
  });
  
  console.log('Clicking Review Session');
  const reviewBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find(b => b.textContent.includes('Review Session'));
  });
  await reviewBtn.click();
  
  await new Promise(r => setTimeout(r, 2000));
  
  await browser.close();
})();
