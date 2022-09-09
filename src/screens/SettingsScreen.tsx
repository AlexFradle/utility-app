import {AnimationType} from "../types";
import ContentBox from "../widgets/ContentBox";

const testNode = (
    <>
        <div>test node</div>
        <div>test node</div>
        <div>test node</div>
        <div>test node</div>
        <div>test node</div>
        <div>test node</div>
        <div>test node</div>
        <div>test node</div>
    </>
);

const SettingsScreen = () => {
    return (
        <div>
            <div>Settings</div>
            <ContentBox
                innerContent={testNode}
                id="test"
                type={AnimationType.CenterWidthHeight}
            />
        </div>
    );
};

export default SettingsScreen;
