import dynamic from 'next/dynamic'
import classes from '../../styles/all-projects.module.scss'

const DynamicProjectsGrid = dynamic(() => import('./projects-grid'))

function AllProjects(props) {
	const { allProjects, initialDisplayProjects, pagination } = props

	return (
		<>
			<section className={`${classes.projects}`}>
				<h1>All Projects</h1>
				<DynamicProjectsGrid
					allProjects={allProjects}
					pagination={pagination}
					initialDisplayProjects={initialDisplayProjects}
				/>
			</section>
		</>
	)
}

export default AllProjects
