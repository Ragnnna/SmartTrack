interface AllertItem {
  color: string,
  title: string,
  idx: number,
  isActive: boolean,
  id: string,
}
  
export interface AddAllertProps {
  closeModal: Function,
  refetch: Function,
  setForceRender: Function,
  id?: string,
  type: string,
  colors?: AllertItem[],
  title?: string
}