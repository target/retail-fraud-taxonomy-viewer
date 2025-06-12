import './Alert.css'
export const Alert = ({ classStyle, heading, subHeading, value }) => {
  return (
    <div className={classStyle}>
      {heading}
      <br />
      {subHeading} {value}
    </div>
  )
}
