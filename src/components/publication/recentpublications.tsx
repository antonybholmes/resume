/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect, useState } from "react"
//import Button from "../../components/button"
//import PublicationYears from "./publicationyears"
import BasePublicationList from "./basepublicationlist"
import Row from "../row"
import PublicationList from "./publicationlist"
import NoResults from "../noresults"
import BlueButton from "../links/bluebutton"

const RECORDS_PER_PAGE = 25

type RecentPublicationsProps = {
  publications: Array<any>
  showAbstract?: boolean
  start?: number
  top?: number
  showCount?: boolean
  showMoreButton?: boolean
  showIndices?: boolean
  className?: string
  baseMode?: boolean
  onPubClick?: any
  onShowMoreClick?: any
  recordsPerPage?: any
}

const RecentPublications: React.FC<RecentPublicationsProps> = ({
  publications,
  showAbstract,
  start,
  top,
  showCount,
  showMoreButton,
  baseMode,
  className,
  onPubClick,
  onShowMoreClick,
  showIndices,
}) => {
  const [filteredPublications, setFilteredPublications] = useState<Array<any>>(
    []
  )
  const [recordsPerPage, setRecordsPerPage] = useState(-1)

  useEffect(() => {
    updatePublications()
  }, [])

  useEffect(() => {
    if (recordsPerPage != top) {
      setRecordsPerPage(top)
    } else {
      updatePublications()
    }
  }, [publications])

  useEffect(() => {
    updatePublications()
  }, [recordsPerPage])

  const updatePublications = () => {
    setFilteredPublications(publications.slice(start, start + recordsPerPage))
  }

  const handleShowMoreClick = (e: any) => {
    setRecordsPerPage(2 * recordsPerPage)
  }

  return (
    <>
      {publications.length > 0 && showCount && (
        <Row isVCentered={true} className="justify-between mb-8">
          <div>
            {/* {`Showing ${Math.min(
              filteredPublications.length,
              recordsPerPage
            )} of ${publications.length} ${
              filteredPublications.length > 1 ? "publications" : "publication"
            }`} */}

            {`${publications.length} ${
              publications.length !== 1 ? "results" : "result"
            }`}
          </div>
        </Row>
      )}

      <div className={`${className}`}>
        {filteredPublications.length > 0 ? (
          <BasePublicationList
            start={start}
            publications={filteredPublications}
            showAbstract={showAbstract}
            onPubClick={onPubClick}
            showIndices={showIndices}
          />
        ) : (
          <NoResults text="No publications found." />
        )}
      </div>
    </>
  )
}

RecentPublications.defaultProps = {
  start: 0,
  top: 15,
  showCount: true,
  className: "",
  showAbstract: true,
  showMoreButton: false,
  onPubClick: null,
  baseMode: true,
  showIndices: false,
}

export default RecentPublications
