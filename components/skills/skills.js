import classes from '../../styles/skills.module.scss'
const Skills = () => {
	return (
    <section className={classes['skills-content']}>
      <ul className={classes['abilities']}>
				<li
          className={classes['ability-command-line']} title='command line interface'
				>
					CLI
				</li>
        <li className={classes['ability-css3']} title='css3'>
					CSS3
				</li>
        <li className={classes['ability-ejs']} title='ejs'>
					EJS
				</li>
        <li className={classes['ability-express']} title='express'>
					Express
				</li>
        <li className={classes['ability-git']} title='git'>
					{' '}
					Git
				</li>
        <li className={classes['ability-html5']} title='html5'>
					HTML5
				</li>
        <li className={classes['ability-jira']} title='jira software'>
					Jira
				</li>
        <li className={classes['ability-js']} title='javascript'>
					JS
				</li>
        <li className={classes['ability-markdown']} title='markdown'>
					MD
				</li>
        <li className={classes['ability-mongodb']} title='mongodb'>
					MongoDB
				</li>
        <li className={classes['ability-nextjs']} title='nextjs'>
					NextJS
				</li>
        <li className={classes['ability-nodejs']} title='nodejs'>
					NodeJS
				</li>
        <li className={classes['ability-npm']} title='npm'>
					NPM
				</li>
        <li className={classes['ability-react']} title='react'>
					React
				</li>
        <li className={classes['ability-sass']} title='sass'>
					Sass
				</li>
        <li className={classes['ability-sql']} title='sql'>
					SQL
				</li>
        <li className={classes['ability-vscode']} title='vs code'>
					VS Code
				</li>
			</ul>
		</section>
	)
}

export default Skills
