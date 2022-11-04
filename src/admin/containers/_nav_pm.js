export default [
    // {
    //     _tag: 'CSidebarNavTitle',
    //     _children: ['Demo'],
    // },
    // {
    //     _tag: 'CSidebarNavItem',
    //     name: 'Multiple Emails',
    //     to: '/admin/demo/create-emails',
    //     icon: 'cil-envelope-closed',
    // },
    {
        _tag: 'CSidebarNavTitle',
        _children: ['Data'],
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Users',
        to: '/admin/users',
        icon: 'cil-user',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Properties',
        to: '/admin/properties',
        icon: 'cil-home',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Contacts',
        to: '/admin/contacts',
        icon: 'cil-phone',
    },
    {
        _tag: 'CSidebarNavTitle',
        _children: ['Alerts'],
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Alerts',
        to: '/admin/alerts',
        icon: 'cil-bell',
    },
];
