import React from 'react'
import Dropzone from 'react-dropzone'

const ReactDropzone = ({ handleDrop, preview }) => {
    return (
        <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
                <section >
                    <div {...getRootProps()} className='drag-card'>
                        <input {...getInputProps()} id={name} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                        {preview && (
                            <img alt="" src={preview} />
                        )}
                    </div>
                </section>
            )}
        </Dropzone>
    )
}

export default ReactDropzone;