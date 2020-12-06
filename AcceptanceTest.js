
import {Selector} from 'testcafe';

const style = Selector(id => {
	bgvalue = Selector('#pg-settings').getStyleProperty('background-color');
	console.log('color: ', bgvalue);
	return bgvalue
});
const menuItems = Selector('.nav-menu__list');
const elementWithId = Selector(id => document.getElementById('#links'));


fixture('Acceptane Testing')
	.page('https://start.duckduckgo.com')
	
	
// This test case is written to check if logo exists. 
// There a way to even verify if the rendered logo is same as the referance logo
test ('AC1-duckduckgo logo on the home page', async t => {
	await t
		.expect(Selector('#logo_homepage_link')).exists
});


// Test case AC2 is set to fail as expected as the actual output is different than expected output
test ('AC2- Verify exactly 10 suggestions in the typeahead dropdown', async t => {
    await t
	.typeText('input[name="q"]', 'super')
	.wait(200)
	const child = Selector('#search_form_homepage > div.search__autocomplete > div.acp-wrap.js-acp-wrap')
	var containerSnapshot = await child()
	await t.expect(containerSnapshot.childElementCount).eql(10)
	
	console.log("containerSnapshot.childElementCount = ",containerSnapshot.childElementCount);  		
}); 

test ('AC3- Expect the first result for given search', async t => {
	await t
		.typeText('input[name="q"]', 'supercalafragalistic')
		.click('input[id="search_button_homepage"]')
		const text = await  Selector('#links > div.result.results_links_deep').nth(0).innerText
		console.log('#############Printing Search Result : ',text)
		await t.expect(text).contains('supercalafragalisticexpialadoshus')		

});

test ('AC4- Verify if the themes link is shown', async t => {
	await t
		.click('#pg-index > div > div.header-wrap--home.js-header-wrap > div > a')
		.wait(200)
		.expect(Selector('#pg-index > div > div.nav-menu--slideout.is-open > ul > ul.nav-menu--theme > li.nav-menu__item.clear > a').exists).ok()
		
});


test ('AC5- The page background should change the color', async t => {
	
	await t
		.click('#pg-index > div > div.header-wrap--home.js-header-wrap > div > a')
		.click(Selector('#pg-index > div > div.nav-menu--slideout.is-open > ul > ul.nav-menu--theme > li.nav-menu__item.clear > a'))
		.click(Selector('#content_internal > div.settings-page-wrapper > div.set-main > div.set-detail.js-set-detail > form > div > div > div:nth-child(4) > label.set-theme'))
		.expect(Selector('#pg-settings').getStyleProperty('background-color')).eql('rgb(28, 28, 28)')
});


const testCases = [ 
    { tcName: 'AC6-1', searchString: 'Back to the future' },
    { tcName: 'AC6-2', searchString: 'BMX Bandits' },
	{ tcName: 'AC6-3', searchString: 'Rocky IV' },
    { tcName: 'AC6-4', searchString: 'Short Circuit' },
	{ tcName: 'AC6-5', searchString: 'The Terminator' },
    { tcName: 'AC6-6', searchString: 'Ferris Bueller\'s day off' }
];

for (const c of testCases) {
    test ('Test to verify 10 results on the result page '+ c.tcName, async t => {

		await t

		.typeText('input[name="q"]', c.searchString)	
			
		.click('input[id="search_button_homepage"]')

		const yesChild = Selector("#links > div.result.results_links_deep")
		var resultsCount  = await yesChild.count
		 
		console.log('#################### resultsCount1 = ',resultsCount)
		await t.expect(resultsCount).eql(10) 

		for (let i = 0; i < resultsCount; i++) {
			const  results = await Selector('#links > div.result.results_links_deep');
			const text = await  results.nth(i).innerText;
			console.log('#############Printing Search Result : ',text);
		} 

    });
}




