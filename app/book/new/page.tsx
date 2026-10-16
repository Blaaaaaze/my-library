import Container from '@/components/Container/Container';
import styles from './page.module.scss';
import Rating from '@/components/Rating/Rating';
import ImageDrop from '@/components/ImageDrop/ImageDrop';

export default function NewBook() {
    return <Container>
        <h1>Add new Book</h1>
        <form action="" className={styles.form}>
            <div className={styles['form__text-container']}>
                <label>
                    Title
                    <input type="text" name='title' id="title" />
                </label>

                <label>
                    Description
                    <textarea name='description' id="description" />
                </label>

                <label htmlFor=''>
                    Tags
                    <input />
                </label>


                <label>
                    Pros
                    <textarea name='pros' id="pros" />
                </label>

                <label>
                    Cons
                    <textarea name='cons' id="cons" />
                </label>
            </div>

            <div className={styles.form__widgets}>
                <Rating />
                <ImageDrop />
                <button className='main-button'>Add</button>
            </div>


            
        </form>
    </Container>
}