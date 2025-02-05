import BrowserOnly from "@docusaurus/BrowserOnly"
import Link from "@docusaurus/Link"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import * as React from "react"
import styles from "./index.module.css"

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    // <header className={clsx("hero hero--primary", styles.heroBanner)}>
    <div className="container">
      <h1 className="hero__title">{siteConfig.title}</h1>
      <p className="hero__subtitle">{siteConfig.tagline}</p>
      <div className={styles.buttons}>
        <Link className="button button--secondary button--lg" to="/docs/intro">
          Create your first planet - 5min ⏱️
        </Link>
      </div>
    </div>
    // </header>
  )
}

const LazyWorldbuilder = React.lazy(
  () => import("../components/world-builder/WorldBuilder"),
)

export default function () {
  return (
    <BrowserOnly>
      {() => {
        return (
          <React.Suspense>
            <LazyWorldbuilder />
          </React.Suspense>
        )
      }}
    </BrowserOnly>
  )
}
