const path = require('path')
const fs = require('fs')
const exec = require('child_process').exec
const chalk = require('chalk')
const execSync = require('child_process').execSync;
const inquirer = require('inquirer')

// module.exports = function () {
//   const tplNameList = Object.keys(tpl)
//   const downloadCountdown = new Spinner(chalk.cyan('Downloading Template...  '), ['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷'])
//   const installCountdown = new Spinner(chalk.cyan('Installing dependencies...  '), ['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷'])
//   const questions = [
//     {
//       type: 'input',
//       name: 'projectName',
//       message: 'What\' s your project name?',
//       validate (val) {
//         if (val) return true
//         return 'Please enter your project name';
//       },
//       filter (val) {
//         return val.replace(/\//g, '_')
//       }
//     },
//     {
//       type: 'list',
//       name: 'tplName',
//       message: 'Choose your template',
//       choices: tplNameList,
//       filter (val) {
//         return val.toLowerCase()
//       }
//     }
//   ]
//   let downloadUrl, projectName
//   inquirer.prompt(questions)
//     .then(answers => {
//       const { tplName } = answers
//       downloadUrl = tpl[tplName].downloadUrl
//       projectName = answers.projectName
//       downloadCountdown.start()
//     })
//     .then(() => new Promise((resolve, reject) => {
//       download(downloadUrl, path.resolve(process.cwd(), projectName), err => {
//         if (err) reject()
//         resolve()
//       })
//     }))
//     .then(() => {
//       const pkg = JSON.parse(fs.readFileSync(`${projectName}/package.json`))
//       pkg.name = projectName
//       fs.writeFileSync(`${projectName}/package.json`, JSON.stringify(pkg))
//     })
//     .then(() => new Promise((resolve, reject) => {
//       downloadCountdown.stop()
//       const commandStr = `cd ${projectName} && npm install && cd ..`
//       installCountdown.start()
//       exec(commandStr, err => {
//         if (err) reject()
//         resolve()
//       })
//     }))
//     .then(() => fs.writeFileSync(`${projectName}/.env`, 'SKIP_PREFLIGHT_CHECK=true'))
//     .then(() => new Promise((resolve, reject) => {
//       installCountdown.stop()
//       figlet('Enjoy your project!', 'Standard', (err, data) => {
//         if (err) reject()
//         resolve(data)
//       })
//     }))
//     .then(data => console.log(data, '\n'))
//     .then(() => console.log(
//       `  Your project has been inited! To launch your app please

//       ${chalk.yellow(`cd ${projectName} && npm start`)}`
//     ))
//     .catch(console.log)
// }

module.exports = function () {
  	const questions = [
	    {
	      type: 'input',
	      name: 'projectName',
	      message: 'What\' s your project name?',
	      validate (val) {
	        if (val) return true
	        return 'Please enter your project name';
	      },
	      filter (val) {
	        return val.replace(/\//g, '_')
	      }
	    },
	    // {
	    //   type: 'list',
	    //   name: 'vueVersion',
	    //   message: 'Choose VUE version?',
	    //   choices: ['3', '2'],
	    //   filter (val) {
	    //     return val.toLowerCase()
     //  		}
	    // }
  	]
  	inquirer.prompt(questions)
    .then(answers => {
    	const {projectName, vueVersion} = answers
    	let v, version
    // 	if (vueVersion === '2') {
    // 		try {
    // 			v = execSync('vue -V').toString()
	   //  		version = v.split('.')[0]
	   //  		if (version === '3') {
				// 	execSync('npm uninstall -g @vue/cli')
				// 	execSync('npm i -g @vue/cli-init', {stdio: 'inherit'});
				// 	execSync(`vue init webpack ${projectName}`, {stdio: 'inherit'});
	   //  		} else if (version === '2') {
				// 	execSync(`vue init webpack ${projectName}`, {stdio: 'inherit'});
	   //  		}
    // 		} catch (err) {
    // 			execSync('npm i -g @vue/cli-init', {stdio: 'inherit'});
				// execSync(`vue init webpack ${projectName}`, {stdio: 'inherit'});
    // 		}
    // 	} else {
    // 		try {
				// v = execSync('vue -V').toString()
    // 			version = v.split('.')[0]
    // 			if (version === '2') {
				// 	execSync('npm uninstall -g @vue/cli-init')
				// 	execSync('npm i -g @vue/cli', {stdio: 'inherit'});
				// 	execSync(`vue create ${projectName}`, {stdio: 'inherit'});
	   //  		} else if (version === '3') {
				// 	execSync(`vue create ${projectName}`, {stdio: 'inherit'});
	   //  		}
    // 		} catch (err) {
				// execSync('npm i -g @vue/cli', {stdio: 'inherit'});
				// execSync(`vue create ${projectName}`, {stdio: 'inherit'});
    // 		}
    // 	}

  		const downloadUrl = 'http://git.fenda.io/open/zaih-vue-element-admin.git'

  		execSync(`git clone ${downloadUrl}`)

		exec(`mkdir ${projectName} && cp -R zaih-vue-element-admin/ ${projectName}/`, err => {
			if (err) {
				console.log(err)
				return
			} 
			execSync('rm -rf zaih-vue-element-admin/')
			const commandStr = `cd ${projectName} && yarn install`
			execSync(commandStr, {stdio: 'inherit'})
			console.log(
      			`  Your project has been inited! To launch your app please

      			${chalk.yellow(`cd ${projectName} && npm start`)}`
    		)
		})
	})
}