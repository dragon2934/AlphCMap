import React, {Suspense} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {CContainer, CFade} from '@coreui/react';
import {Spinner} from 'reactstrap';

// routes config
import routes from '../routes';

const loading = (
    <div className={'loader'}>
        <Spinner
            type={'grow'}
            color={'primary'}
            style={{width: '5rem', height: '5rem'}}>
            {''}
        </Spinner>
    </div>
);

const TheContent = () => {
    return (
        <main className="c-main">
            <CContainer fluid className={'h-100'}>
                <Suspense fallback={loading}>
                    <Switch>
                        {routes.map((route, idx) => {
                            return (
                                route.component && (
                                    <Route
                                        key={idx}
                                        path={route.path}
                                        exact={route.exact}
                                        name={route.name}
                                        render={(props) => (
                                            <CFade className={'h-100'}>
                                                <route.component {...props} />
                                            </CFade>
                                        )}
                                    />
                                )
                            );
                        })}
                        <Redirect from="/" to="/admin/demo/create-emails" />
                    </Switch>
                </Suspense>
            </CContainer>
        </main>
    );
};

export default React.memo(TheContent);
