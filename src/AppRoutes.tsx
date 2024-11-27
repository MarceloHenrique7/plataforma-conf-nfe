

import { Navigate, Route, Routes } from  'react-router-dom'
import ConfPage from './pages/ConfPage'
import HomePage from './pages/HomePage'
import Layout from './layout/layout'
import RegisterXML from './pages/RegisterXML'
import ProductPage from './pages/ProductPage'
import NFesVerifiedPage from './pages/NFesVerifiedPage'
import SingleNFePage from './pages/single-nfe-page'
import FindToLabelPage from './pages/FindtoLabelPage'
import RegisterXlsx from './pages/RegisterXlsx'
import RegisterSupervisor from './pages/RegisterSupervisor'
import ResultAllNFePage from './pages/ResultAllNFePage'
import LoginPage from './pages/LoginPage'






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
                path='/login'
                element={
                        <LoginPage />
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
                path='/registrar-supervisor-m1'
                element={
                    <Layout>
                        <RegisterXlsx />
                    </Layout>
                }
            />
            <Route 
                path='/registrar-supervisor'
                element={
                    <Layout>
                        <RegisterSupervisor />
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
            <Route
                path='/procurar/nfe/:codNFe'
                element={
                    <Layout>
                        <SingleNFePage />
                    </Layout>
                }
            />
            <Route
                path='/procurar/nfe/all'
                element={
                    <Layout>
                        <ResultAllNFePage />
                    </Layout>
                }
            />
            <Route
                path='/buscar-nfe'
                element={
                    <Layout>
                        <FindToLabelPage />
                    </Layout>
                }
            />
        <Route path="*" element={<Navigate to="/" />}/>

        </Routes>
    )

}


export default AppRoutes



