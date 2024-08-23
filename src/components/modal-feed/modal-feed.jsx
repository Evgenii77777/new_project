import { Modal, Rate, Input, Button } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import styles from './modal-feed.module.css';

const { TextArea } = Input;

export const ModalFeed = ({
    isModalOpen,
    valueStar,
    setValueStar,
    handleCancel,
    valueInp,
    setValueInp,
    onPostFeed,
}) => (
    <Modal title='Ваш отзыв' open={isModalOpen} footer={false} onCancel={handleCancel} centered>
        <div className={styles.box}>
            <Rate
                character={({ index }) => {
                    if (index !== undefined && index < valueStar) {
                        return <StarFilled style={{ color: 'rgb(250, 173, 20)' }} />;
                    }
                    return <StarOutlined style={{ color: 'rgb(250, 173, 20)' }} />;
                }}
                className={styles.rate}
                onChange={setValueStar}
                value={valueStar}
            />
            <TextArea
                style={{ height: 36 }}
                value={valueInp}
                autoSize
                onChange={(e) => {
                    setValueInp(e.target.value);
                }}
            />
        </div>
        <div className={styles.wrap}>
            <Button
                data-test-id='new-review-submit-button'
                className={styles.btnModal}
                type='primary'
                disabled={!valueStar}
                onClick={() => {
                    onPostFeed({ message: valueInp, rating: valueStar });
                }}
            >
                Опубликовать
            </Button>
        </div>
    </Modal>
);
