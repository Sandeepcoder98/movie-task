import CreateMovie from '@/component/create-movie'
import React from 'react'

const createUpdateMovie = ({ params }) => {
    const { id } = params;
    return (
        <div>
            <CreateMovie id={id} />
        </div>
    )
}
export default createUpdateMovie
