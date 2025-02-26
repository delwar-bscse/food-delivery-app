import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Link to="/">
                        <Button type="primary" size='large'>Back Home</Button>
                    </Link>
                }
            />
        </div>
    );
}

export default NotFound;