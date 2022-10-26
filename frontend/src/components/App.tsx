import { Provider } from '../store/context'
import NewsPage from './NewsPage'
import NavBar from './NavBar'

export default () => {
  return (
    <Provider>
      <NavBar />
      <NewsPage />
    </Provider>
  )
}
