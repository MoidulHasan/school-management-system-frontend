import UserService from './service/UserService';
import router from './router';


const routes = (UserData) => {
    return {
        admin: [
            {
                label: 'Home',
                items: [{
                    label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/'
                }]
            },
            {
                label: 'Others', icon: 'pi pi-fw pi-sitemap',
                items: [
                    {
                        label: 'Attendence', icon: 'pi pi-fw pi-book',
                        items: [
                            { label: "Students Attendence", icon: '' },
                            { label: "Teachers Attendence", icon: '' },
                        ]
                    },
                    {
                        label: 'Users', icon: 'pi pi-fw pi-users',
                        items: [
                            { label: "Admin", icon: '' },
                            { label: "Teachers", icon: '' },
                            { label: "Accountant", icon: '' },
                            { label: "Students", icon: '' }
                        ]
                    },
                    {
                        label: 'Academics', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: "Class", icon: '', to: '/academic/class' },
                            { label: "Subjects", icon: '' },
                            { label: "Class Room", icon: '' },
                            { label: "Class Routine", icon: '' }
                        ]
                    },
                    {
                        label: 'Reports', icon: 'pi pi-fw pi-file-pdf',
                        items: [
                            { label: "Students", icon: '' },
                            { label: "Teachers", icon: '' },
                            { label: "Accountent", icon: '' },
                            { label: "Student Attendance", icon: '' },
                            { label: "Teacher Attendance", icon: '' }
                        ]
                    },
                    { label: 'Announcement', icon: 'pi pi-fw pi-bell' },
                    { label: 'Accounting', icon: 'pi pi-fw pi-credit-card' },
                    { label: 'Result', icon: 'pi pi-fw pi-database' },
                    {
                        label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: () => {
                            console.log("logout function called")
                            UserService.logout();
                            UserData.removeUser();
                            router.push('/login');
                        }
                    }
                ]
            },
        ],
        student: [
            {
                label: 'Home',
                items: [{
                    label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/'
                }]
            },
            {
                label: 'Others', icon: 'pi pi-fw pi-sitemap',
                items: [
                    {
                        label: 'Academics', icon: 'pi pi-fw pi-book',
                        items: [
                            { label: "Class Routine", icon: '' },
                            { label: "Exam Routine", icon: '' },
                        ]
                    },
                    {
                        label: 'Accounts', icon: 'pi pi-fw pi-book',
                        items: [
                            { label: "Current Due", icon: '' },
                            { label: "Previous History", icon: '' },
                        ]
                    },
                    { label: 'Results', icon: 'pi pi-fw pi-book' },
                    {
                        label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: () => {
                            console.log("logout function called")
                            UserService.logout();
                            UserData.removeUser();
                            router.push('/login');
                        }
                    }

                ]
            }
        ],
        accountant: [

        ]
    }
}


export default routes;