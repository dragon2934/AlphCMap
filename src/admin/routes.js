import React from "react";
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));
const UserEdit = React.lazy(() => import('./views/users/UserEdit'));

const Properties = React.lazy(() => import('./views/properties/Properties'));
const Property = React.lazy(() => import('./views/properties/Property'));
const PropertyEdit = React.lazy(() =>
    import('./views/properties/PropertyEdit'),
);

const PropertyFileUpload = React.lazy(() => import('./views/properties/file-upload'));

const routes = [
    { path: '/admin/', exact: true, name: 'Home' },
    // User Routes
    { path: '/admin/users', exact: true, name: 'Users', component: Users },
    {
        path: '/admin/users/new',
        exact: true,
        name: 'New User',
        component: UserEdit,
    },
    {
        path: '/admin/users/:id',
        exact: true,
        name: 'User Details',
        component: User,
    },
    {
        path: '/admin/edit/user/:id',
        exact: true,
        name: 'Edit User',
        component: UserEdit,
    },

    {
        path: '/admin/file-upload',
        exact: true,
        name: 'FileUpload',
        component: PropertyFileUpload,
    },
    {
        path: '/admin/properties',
        exact: true,
        name: 'Properties',
        component: Properties,
    },
    {
        path: '/admin/properties/new',
        exact: true,
        name: 'New Property',
        component: PropertyEdit,
    },
    {
        path: '/admin/properties/:id',
        exact: true,
        name: 'Property Details',
        component: Property,
    },
    {
        path: '/admin/edit/property/:id',
        exact: true,
        name: 'Edit Property',
        component: PropertyEdit,
    },
    {
        path: '/admin/properties/:id',
        exact: true,
        name: 'User Details',
        component: User,
    },
];

export default routes;
