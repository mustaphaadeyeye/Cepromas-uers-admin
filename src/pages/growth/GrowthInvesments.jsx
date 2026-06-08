import React from 'react'
import Wrapper from '../../components/wrapper/Wrapper'
import GrowthCard from './GrowthCard'
import Pagination from '../../components/buttons/Pagination'



const GrowthInvesments = () => {
  return (
    <div>
        <Wrapper>
        <GrowthCard/>
        <div>
            <Pagination/>
        </div>
        </Wrapper>
    </div>
  )
}

export default GrowthInvesments