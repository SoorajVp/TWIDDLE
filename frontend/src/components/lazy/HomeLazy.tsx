import { Suspense, lazy } from "react";
import { PageLoading } from "../shimmer/Loading";
// import HomePage from "../../pages/user/HomePage"
const HomePage = lazy(() => import('../../pages/user/HomePage'));


const HomeLazy = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <HomePage />
    </Suspense>
  )
}

export default HomeLazy;