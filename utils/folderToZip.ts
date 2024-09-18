import JSZip from 'jszip'

const folderToZip = async (files: File[]) => {
  const zip = new JSZip()

  files.forEach((file) => {
    zip.file(file.webkitRelativePath || file.name, file)
  })

  return zip.generateAsync({ type: 'blob' })
}

export default folderToZip
