import dynamic from 'next/dynamic'
import classes from '../../styles/all-projects.module.scss'

const DynamicProjectsGrid = dynamic(() => import('./projects-grid'))

function AllProjects(props) {
	const { projects, initialDisplayProjects, pagination } = props

	return (
		<>
			<section className={`${classes.projects}`}>
				<h1>All Projects</h1>
				<DynamicProjectsGrid
					projects={projects}
					pagination={pagination}
					initialDisplayProjects={initialDisplayProjects}
				/>
			</section>
		</>
	)
}

export default AllProjects
