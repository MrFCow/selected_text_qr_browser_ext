browser.runtime.onInstalled.addListener( () => {
	browser.runtime.openOptionsPage(() => console.log('options page opened'));
});

