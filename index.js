const core = require('@actions/core');
const github = require('@actions/github');
const process = require('child_process');
const fs = require('fs');
const axios = require('axios');

try {
  // `who-to-greet` input defined in action metadata file
  const use_strict = core.getInput('use_strict');
  const config = core.getInput('config');
  const payload = JSON.stringify(github.context.payload);
  // console.log(payload);

  const configshell = `echo "module.exports = {extends: ['${config}']};" > commitlint.config.js
  `;
  console.log(configshell);
  process.execSync(configshell);

  var commitMessage; 
  if (JSON.parse(payload).hasOwnProperty("pull_request")){
    var url = JSON.stringify(github.context.payload.pull_request.commits_url);
    url = url.replace(/^"*|\"*$/g, "");
    console.log(url);
    (async function(){
      try {
        let res = await axios.get(url);
        res.data.forEach(element => {
          var commitMessage = JSON.stringify(element.commit.message);
          console.log(`Commit Message is: ${commitMessage}`);
          
          const bashcmd = `./lint.sh ${commitMessage}`;
          console.log(bashcmd);
          process.execSync(bashcmd);
          
          const message = fs.readFileSync('error_message.txt');
          if (message.toString() != ""){
            throw new Error(message.toString());
          }
        });
      }catch(e){
        core.setFailed(e.message);
      }
    })();
  }else{
    github.context.payload.commits.forEach(element => {
      commitMessage = JSON.stringify(element.message);
      console.log(`Commit Message is: ${commitMessage}`);

      const bashcmd = `./lint.sh ${commitMessage}`;
      console.log(bashcmd);
      process.execSync(bashcmd);
      
      const message = fs.readFileSync('error_message.txt');
      if (message.toString() != ""){
        throw new Error(message.toString());
      }
    });
  }
} catch (error) {
  core.setFailed(error.message);
}
