import { Suspense, lazy } from "react";
import { PageLoading } from "../shimmer/Loading";
const HomePage = lazy(() => import('../../pages/user/HomePage'));


const HomeLazy = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <HomePage />
    </Suspense>
  )
}

export default HomeLazy;