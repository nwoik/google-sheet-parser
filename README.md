# google-sheet-parser
 
For parsing html exported from LTRC google sheets

## Setup

1. Install Node (v22 and above)

2. Install node modules. This will create a 'node_modules' folder

```sh
npm install
```

3. Go to the LTRC google sheet and export to html
4. Copy the LTRC folder into workspace
5. Create an empty 'out' folder

The workspace folder should look like this 

> __google-sheet-parser/__
>> LTRC/
>> out/
>> node_modules/
>> ...

6. Run the jest tests

```sh
npm test
```

Out folder should be populated with .json files