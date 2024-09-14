# wdym-extension

A chrome extension that adds a "wdym?" option in your context menu (the menu that comes up when you right-click).
Using this option will take the currently highlighted text and open a popup conversation with a chatbot, starting off the conversation with the message "What does this mean? <highlighted text>"

Check out this video for a demo:
https://www.youtube.com/watch?v=ZXZlg_Fk2A0

This is mainly just meant for my own use, as a chatbot version of the "Look up" option you can get when highlighting text in iOS. So I don't have any real roadmap (beyond the todo list at the bottom) or intent to develop this further, but if you want to make changes go for it, or if you have changes you think I should consider investing in, let me know!


### How to use this
1) Before you can use this, you'll need a [groq](https://groq.com/) API key that you can use for model calls. The free tier of groq is fine for this, so you won't even need to give a credit card.
2) Once you have an account you can create an [api key](https://console.groq.com/keys)
3) Now that this is setup, we can start to setup the code for local use. Download and install this code with `git clone git@github.com:caseyhird/wdym-extension.git` (or your preferred method of cloning)
4) After moving into the `wdym-extension` directory, install dependencies with `pnpm install`
5) Now inside the `wdym-extension` directory create a file named `.env` and add your api key in the format "GROQ_API_KEY=<your key>" using the value you just created in step 2
6) Now we have all the local files setup, and we can build the project using `npx webpack` (again in the `wdym-extension` directory)
7) This is now ready to use! Open a new tab and go to the URL "chrome://extensions/"
8) Look in the top-right corner here and make sure that "Developer mode" is toggled ON
9) Now go to the top-left and click "Load unpacked" then select your `wdym-extension` directory
10) That's it! You should now be able to use the extension as shown in the video


developement todos:
- Add streaming for chat response
- reduce build size
- maybe put popup next to click location
- use typescript
