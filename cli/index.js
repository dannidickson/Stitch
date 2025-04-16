#!/usr/bin/env node

import { intro, outro, text, select, multiselect, confirm, spinner } from '@clack/prompts'
import config from '../config/modules.json' with { "type": "json" }
import color from 'picocolors'

async function main() {
  // Welcome/Intro
  intro(color.blue('Welcome to the Silverstripe Backpack'))
  console.log('Jump start a Silverstripe project within a few clicks\n')

  // Step 1: Basics
  console.log(color.blue('\n1. The basics'))
  const projectName = await text({
    message: 'What is the name of your project?',
    placeholder: 'my-silverstripe-project',
    validate: (value) => {
      if (!value) return 'Project name is required'
      if (!/^[a-z0-9-]+$/.test(value))
        return 'Project name can only contain lowercase letters, numbers, and dashes'
      return undefined
    },
  })

  if (projectName === null) {
    outro('Setup cancelled. Goodbye!')
    process.exit(0)
  }

  console.log(color.blue('\n2. Pick a version'))
  const versionOptions = config.versions.map((mod) => ({
    value: mod.name,
    label: mod.name,
    hint: mod.description,
  }))
  const versions = await select({
    message: 'Which version of Silverstripe do you want to target',
    options: [
      ...versionOptions,
    ],
    required: true,
  })

  // Step 2: Modules
  console.log(color.blue('\n2. Pick modules'))
  const moduleOptions = config.modules.map((mod) => ({
    value: mod.name,
    label: mod.name,
    hint: mod.description,
  }))
  const modules = await multiselect({
    message: 'Select the modules you want to install',
    options: [
      ...moduleOptions,
    ],
    required: true,
  })

  if (modules === null) {
    outro('Setup cancelled. Goodbye!')
    process.exit(0)
  }

  // Step 3: Extras
  // console.log(color.blue('\n3. Pick extras'))
  // const extras = await multiselect({
  //   message: 'Select any extra features you want to add',
  //   options: [
  //     { value: 'blog', label: 'Blog Module', hint: 'Add blog functionality' },
  //     { value: 'elemental', label: 'Elemental', hint: 'Content blocks' },
  //     { value: 'userforms', label: 'User Forms', hint: 'Form builder' },
  //     { value: 'googleanalytics', label: 'Google Analytics', hint: 'Analytics integration' },
  //   ],
  // })

  // if (extras === null) {
  //   outro('Setup cancelled. Goodbye!')
  //   process.exit(0)
  // }

  // Step 4: Confirmation & Creation
  const shouldProceed = await confirm({
    message: `Ready to create your Silverstripe project "${projectName}"?`,
  })

  if (!shouldProceed) {
    outro('Setup cancelled. Goodbye!')
    process.exit(0)
  }

  // Final step - creating the project
  const s = spinner()
  s.start('Creating your Silverstripe project')

  // Simulate project creation with timeout
  await new Promise((resolve) => setTimeout(resolve, 2000))

  s.stop('Project created successfully!')

  // Output summary
  console.log('\n' + color.green('✓') + ' Project summary:')
  console.log(`  Name: ${color.bold(projectName)}`)
  console.log(`  Modules: ${color.bold(modules.join(', '))}`)
  // if (extras.length > 0) {
  //   console.log(`  Extras: ${color.bold(extras.join(', '))}`)
  // }

  // Final instructions
  outro(`${color.green('Success!')} Your Silverstripe project is ready.`)
  console.log(`\nNext steps:
  ${color.cyan('cd')} ${projectName}
  ${color.cyan('composer install')}
  ${color.cyan('npm install')}
  ${color.cyan('npm run dev')}`)
}

main().catch(console.error)
