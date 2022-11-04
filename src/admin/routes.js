import React from 'react';

const CreateEmails = React.lazy(() => import('./views/demo/CreateEmails'));

const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));
const UserEdit = React.lazy(() => import('./views/users/UserEdit'));

const Properties = React.lazy(() => import('./views/properties/Properties'));
const Property = React.lazy(() => import('./views/properties/Property'));
const PropertyEdit = React.lazy(() =>
    import('./views/properties/PropertyEdit'),
);
const PropertiesMap = React.lazy(() =>
    import('./views/properties/PropertiesMap'),
);

const Contacts = React.lazy(() => import('./views/contacts/Contacts'));
const Contact = React.lazy(() => import('./views/contacts/Contact'));

const Alerts = React.lazy(() => import('./views/alerts/Alerts'));
const CreateAlert = React.lazy(() => import('./views/alerts/CreateAlert'));
const ViewAlert = React.lazy(() => import('./views/alerts/ViewAlert'));

const PropertiesManage = React.lazy(() => import('./views/properties/PropertiesManage'));

const routes = [
    {path: '/admin/', exact: true, name: 'Home'},
    // User Routes
    {path: '/admin/users', exact: true, name: 'Users', component: Users},
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
    // Contact Routes
    {
        path: '/admin/contacts',
        exact: true,
        name: 'Contacts',
        component: Contacts,
    },
    {
        path: '/admin/contacts/:id',
        exact: true,
        name: 'Contact Details',
        component: Contact,
    },
    // Property Routes
    {
        path: '/admin/PropertiesManage',
        exact: true,
        name: 'Units Manage',
        component: PropertiesManage,
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
        path: '/admin/locations',
        exact: true,
        name: 'Locations',
        component: PropertiesMap,
    },
    {
        path: '/admin/alerts',
        exact: true,
        name: 'Alerts',
        component: Alerts,
    },
    {
        path: '/admin/alerts/new',
        exact: true,
        name: 'Create Alert',
        component: CreateAlert,
    },
    {
        path: '/admin/alerts/:id',
        exact: true,
        name: 'View Alert',
        component: ViewAlert,
    },
    {
        path: '/admin/properties/:id',
        exact: true,
        name: 'User Details',
        component: User,
    },
    {
        path: '/admin/demo/:create-emails',
        exact: true,
        name: 'Multiple Emails',
        component: CreateEmails,
    },
];

export default routes;
