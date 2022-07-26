import { ConfirmProvider } from 'material-ui-confirm';
import SectionPage from './SectionListPage';

export default function products() {
    return (
        <ConfirmProvider>
            <SectionPage></SectionPage>
        </ConfirmProvider>
    )
}