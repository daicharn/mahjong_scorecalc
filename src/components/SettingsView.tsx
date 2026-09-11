type SettingsProps = {showSettings: boolean, setShowSettings: (isShow: boolean) => void};

export default function SettingsVIew(props: SettingsProps){
    return (
      <div className={`settings_view ${props.showSettings ? "open" : ""}`}>
        <div className="settings_panel">
        </div>
        <div className="settings_tab" onClick={() => props.setShowSettings(!props.showSettings)}>
        </div>
      </div>
    )
}