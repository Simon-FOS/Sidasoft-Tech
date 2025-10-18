import { countCourses } from "../modules/course/services/admin.Course.service.js"

export const dashboard_view = async (req, res) => {
    try {
        return res.render('dashboard', {
            pageTitle: 'Dashboard',
            layout: 'admin',
            totalCourses: await countCourses()
        })
    } catch (error) {
        console.log(error)
        return render('error/500', { 'error': error.message })
    }
}