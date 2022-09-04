import { ConfirmProvider } from 'material-ui-confirm';
import ProductPage from './ProductListPage';

export default function products() {
    return (
        <ConfirmProvider>
            <ProductPage></ProductPage>
        </ConfirmProvider>
    )
}