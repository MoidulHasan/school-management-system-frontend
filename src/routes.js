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
                        label: 'Admission', icon: 'pi pi-fw pi-book',
                        items: [
                            { label: "Applications", icon: '', to: '/admission/applications' },
                            { label: "Admit Student", icon: '', to: '/admission/admit' },
                        ]
                    },
                    {
                        label: 'Attendence', icon: 'pi pi-fw pi-book',
                        items: [
                            { label: "Staff's Attendence", icon: '' },
                            { label: "Student's Attendence", icon: '' },
                        ]
                    },
                    {
                        label: 'Users', icon: 'pi pi-fw pi-users',
                        items: [
                            // { label: "Admin", icon: '' },
                            { label: "Teachers", icon: '', to: '/users/teachers' },
                            // { label: "Accountant", icon: '' },
                            { label: "Students", icon: '', to: '/users/students' }
                        ]
                    },
                    {
                        label: 'Academics', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: "Class", icon: '', to: '/academic/class' },
                            { label: "Subjects", icon: '', to: '/academic/subject' },
                            { label: "Class Room", icon: '', to: '/academic/classroom' },
                            { label: "Class Time", icon: '', to: '/academic/classtime' },
                            { label: "Class Routine", icon: '', to: '/academic/class-routine' }
                        ]
                    },
                    {
                        label: 'Reports', icon: 'pi pi-fw pi-file-pdf',
                        items: [
                            { label: "Students", icon: '', to: '/reports/students' },
                            { label: "Teachers", icon: '', to: '/reports/teachers' }
                        ]
                    },

                    // {
                    //     label: 'Reports', icon: 'pi pi-fw pi-file-pdf',
                    //     items: [
                    //         { label: "Students", icon: '', to: 'reports/students' },
                    //         { label: "Teachers", icon: '', to: 'reports/teachers' },
                    //         // { label: "Accountent", icon: '' },
                    //         // { label: "Student Attendance", icon: '' },
                    //         // { label: "Teacher Attendance", icon: '' }
                    //     ]
                    // },
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
                            // { label: "Exam Routine", icon: '' },
                        ]
                    },
                    {
                        label: 'Accounts', icon: 'pi pi-fw pi-book',
                        items: [
                            { label: "Current Due", icon: '' },
                            { label: "Previous History", icon: '' },
                        ]
                    },
                    { label: 'Announcement', icon: 'pi pi-fw pi-bell' },
                    // { label: 'Results', icon: 'pi pi-fw pi-book' },
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
        teacher: [
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
                            // { label: "Exam Routine", icon: '' },
                        ]
                    },
                    { label: 'Announcement', icon: 'pi pi-fw pi-bell' },

                    // { label: 'Results', icon: 'pi pi-fw pi-book' },
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
        ]
    }
}


export default routes;