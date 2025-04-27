// create the project
import fs from 'fs';
import { spawn} from 'child_process';
import defaultOptions from '../config/defaults.json' with { type: 'json' }
import color from 'picocolors'
import path from 'path';

const installProject = async (state) => {
    return new Promise((resolve, reject) => {
      console.log(color.blue(`Running: composer create-project silverstripe/installer ${state.projectName}`))
      const installProject = spawn('composer', ['create-project', 'silverstripe/installer', state.projectName], { cwd: state.projectDir });
      addOutput(installProject, resolve);
    })
  }
  
  const setupDDEV = async (state) => {
    return new Promise((resolve, reject) => {
      console.log(color.blue(`Running: ddev config --project-type=silverstripe --docroot=public`))
      const ddevCommand = spawn('ddev', ['config', '--project-type=silverstripe', '--docroot=public'], { cwd: state.projectDir });
      addOutput(ddevCommand, resolve);
    })
  }
  
  const allowPlugins = async (state) => {
    return new Promise((resolve, reject) => {
      console.log(color.blue(`Running: composer config --no-plugins allow-plugins ${state.allowPlugins}`))
      const allowPlugins = spawn('composer', ['config', '--no-plugins', 'allow-plugins', state.allowPlugins], { cwd: state.projectDir });
      addOutput(allowPlugins, resolve);
    })
  };
  
  // installs the modules 
  const installModules = async (state) => {
    return new Promise((resolve, reject) => {
      console.log(color.blue(`Running: composer require ${state.modules.join(' ')}`))
      const installModules = spawn('composer', ['require', ...state.modules], { cwd: state.projectDir });
      addOutput(installModules, resolve);
    })
  }
  
  const applyPatterns = async (state) => {
    const patternsDirectory = path.resolve(__dirname, '..', '.patterns');
    const { paths } = defaultOptions;
  
    state.patterns.layouts.forEach(layout => {
      console.log(patternsDirectory, layout);
      const layoutDir = path.join(patternsDirectory, layout);
      const layoutItems = fs.readdirSync(layoutDir);
      layoutItems.forEach(fileName => {
        let { name, ext, base } = path.parse(fileName);
        ext = ext.substring(1);
  
        console.log(paths, ext);
        if (paths[ext]) {
          const copyToDirectory = path.resolve(__dirname, '..', `${state.projectDir}/`, paths[ext], name).trim();
          console.log(copyToDirectory);
          if (!fs.existsSync(copyToDirectory)) {
            fs.mkdirSync(copyToDirectory);
          }
  
          fs.copyFile(path.join(layoutDir, base), path.join(copyToDirectory, base), (err) => {
            if (err) throw err;
            console.log(`${name}.txt was copied`);
          });
        }
      });
    });
  }

const createProjectFromState = async (state) => {
    console.log(color.blue(`Creating directory at ${state.projectDir}`))

    if (!fs.existsSync(state.projectDir)){
      fs.mkdirSync(state.projectDir);
    }
   
    await installProject(state);
    state.projectDir = path.join(state.projectDir, state.projectName);
    if (state.useDDEV) {
      await setupDDEV(state);
    }
  
    await allowPlugins(state);
    await installModules(state);
  
    if (state.usePatterns) {
      await applyPatterns(state);
    }  
}

export default createProjectFromState;