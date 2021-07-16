let allertsData = [
    { id: 1, title: "Patient in", color: "rgba(72, 125, 54, 0.19)", isActive: false },
    { id: 2, title: "Doctor required", color: "rgba(238, 88, 151, 0.19)", isActive: false },
    { id: 3, title: "Assistent required", color: "rgba(31, 125, 116, 0.19)", isActive: false },
    { id: 4, title: "Doctor in", color: "rgba(250, 112, 12, 0.19)", isActive: false },
    { id: 5, title: "Assistent in", color: "rgba(55, 67, 171, 0.19)", isActive: false },
    { id: 6, title: "Emergency", color: "rgba(228, 133, 243, 0.19)", isActive: false },
    { id: 7, title: "Financial", color: "rgba(248, 251, 102, 0.19)", isActive: false },
]

const clearAllerts = () => {
  allertsData = [
    { id: 1, title: "Patient in", color: "rgba(72, 125, 54, 0.19)", isActive: false },
    { id: 2, title: "Doctor required", color: "rgba(238, 88, 151, 0.19)", isActive: false },
    { id: 3, title: "Assistent required", color: "rgba(31, 125, 116, 0.19)", isActive: false },
    { id: 4, title: "Doctor in", color: "rgba(250, 112, 12, 0.19)", isActive: false },
    { id: 5, title: "Assistent in", color: "rgba(55, 67, 171, 0.19)", isActive: false },
    { id: 6, title: "Emergency", color: "rgba(228, 133, 243, 0.19)", isActive: false },
    { id: 7, title: "Financial", color: "rgba(248, 251, 102, 0.19)", isActive: false },
  ]
}

const setActive = (id: number): any => {
  const idx = id
  const newAllerts = allertsData.map(el => {
    if (el.id === idx) {
      return {...el, isActive: true}
    }
    return {...el, isActive: false }
  })
  allertsData = newAllerts
  return newAllerts
}

export { setActive, allertsData, clearAllerts }