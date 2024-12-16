import { Layout } from 'antd'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Cloudscapes from '../pages/cloudscapes'
import Geospatial from '../pages/geospatial'
import Raymarching from '../pages/raymarching'
import styles from './index.module.scss'

const { Sider, Content } = Layout

const Layouts = () => {
  return (
    <Layout className={styles.layout}>
      {/* <Sider width='94px' className={styles.sider}>
        Sider
      </Sider> */}
      <Layout>
        <Content className={styles.content}>
          <Router>
            <Routes>
              <Route path='/' element={<Geospatial />} />
              <Route path='/raymarching' element={<Raymarching />} />
              <Route path='/cloudscapes' element={<Cloudscapes />} />
            </Routes>
          </Router>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Layouts
