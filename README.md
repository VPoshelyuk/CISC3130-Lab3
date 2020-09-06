# CISC3130-Lab2
## Create a Report: Who appears on the top streamed list?
### About
This CLI tool allows you to parse any CSV report from [SpotifyCharts](https://spotifycharts.com/regional) and provides you with the information on artists' appearances in the parsed chart right in your command line.  
Sounds awesome, right? But the cherry on the top of all of it is the fact that you also get two txt reports with the sorted data: one of them holds data sorted by artist name and another one has data sorted by the number of appearances, you can easily distinguish them by the filename postfix.  
Feel lazy and don't want to go to [SpotifyCharts](https://spotifycharts.com/regional) to download a report to parse? Don't worry, you can still use my awesome CLI tool since it has one of the latest Global Daily CSVs built-in. But more about that in the [Setup and Usage](#setup-and-usage) section.  

---
### Dependencies
---
- Terminal for command line access  

The main piece of software that this repo holds is a Node app(JavaScript subdirectory), for that to run you will need:
- Node.js v10.22.0 or newer (You can check your Node version by running ```node -v``` in your Terminal)  

There is also a Java program in the Java subdirectory, it doesn't have even a half of the capabilities that the Node.js version has, so let's think of it as of depreciated, but if you decide to check it out, you'll need:  
- Java v8.251 or newer (You can check your Java version by running ```java -version``` in your Terminal)

### Setup and Usage
---
***NOTE: This guide is only applicable to the JS version of the program since Java's version single purpose was to remind me of the Java syntax and how uncool Java is***
1. While you are in the home directory of this repo, press on the green "Code" button in the top right corner.
2. You will be prompted to copy an SSH or HTTPS URL to clone this repo to your local machine.
3. After you got that URL, go to the Terminal on your local machine(I will assume you are on Mac or Linux) and run the following command: 
```zsh
git clone *PASTE THE LINK HERE*
```
4. After all the files are copied to your local machine navigate to the newly created directory using the following command 
```zsh 
cd CISC3130-Lab2/JavaScript/
```  
5. When you are inside of the JavaScript directory
- If you want to get this tool running with the default preloaded CSV, simply run the following command without any argumnets provided: 
```zsh
node get-reports.js
```  
- Otherwise, if you have a custom report to parse, run the same command but with the argument specifying the path to your CSV file: 
```zsh
node get-reports.js *PATH TO CSV*
```  
***NOTE: Filepath should be a path to the file saved locally, also no spaces in the Pathname are allowed.***  
<div align="center">
    <p>If you have any troubles with running this program, you can always email me by clicking at the following link:</p>
    <a href="mailto:v.pashaliuk@gmail.com?subject=[GitHub]%20SpotifyCharts%20CSV%20Parser">Tell this guy that his software stinks</a>
    <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/9bb1d693658133.5e98ba7eb53fc.gif" />
</div>
