const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');

async function robot() {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	const baseCurrency =
		readlineSync.question('Digite a moeda inicial: ') || 'dollar';
	const finalCurrency =
		readlineSync.question('Digite a moeda final: ') || 'real';

	const searchUrl = `https://www.google.com/search?q=${baseCurrency}+para+${finalCurrency}&oq=${baseCurrency}+para+${finalCurrency}&aqs=chrome.0.69i59j0l7.1726j0j4&sourceid=chrome&ie=UTF-8`;
	await page.goto(searchUrl);

	const result = await page.evaluate(() => {
		return document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc').value;
	});

	console.log(`1 ${baseCurrency} equals ${result} ${finalCurrency}.`);
	await browser.close();
}

robot();
