

import { Route, Routes } from  'react-router-dom'
import ConfPage from './pages/ConfPage'
import HomePage from './pages/HomePage'
import Layout from './layout/layout'
import RegisterXML from './pages/RegisterXML'
import ProductPage from './pages/ProductPage'
import NFesVerifiedPage from './pages/NFesVerifiedPage'






const AppRoutes = () => {


    return (
        <Routes>
            <Route 
                path='/'
                element={
                    <Layout>
                        <HomePage />
                    </Layout>
                }
            />
            <Route 
                path='/conf'
                element={
                    <Layout>
                        <ConfPage />
                    </Layout>
                }
            />
            <Route 
                path='/conf/:id'
                element={
                    <Layout>
                        <ProductPage />
                    </Layout>
                }
            />
            <Route 
                path='/registrar-xml'
                element={
                    <Layout>
                        <RegisterXML />
                    </Layout>
                }
            />
            <Route
                path='/notas-fiscais-status'
                element={
                    <Layout>
                        <NFesVerifiedPage />
                    </Layout>
                }
            />
        </Routes>
    )

}


export default AppRoutes



