import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import GlobalParams from "../GlobalParams";

const LandingContent = () => {
    const images = [
        {
            url: "url('" + GlobalParams.baseUrl + "/album/download/rm_debug.jpg')",
            title: '业务合作',
            width: '33%',
            naviLink: '',
        },
        {
            url: "url('" + GlobalParams.baseUrl + "/album/download/back_desktop.jpg')",
            title: '关于我们',
            width: '34%',
            naviLink: '',
        },
        {
            url: "url('" + GlobalParams.baseUrl + "/album/download/back_desktop.jpg')",
            title: 'Github主页',
            width: '33%',
            naviLink: '',
        },
        {
            url: "url('" + GlobalParams.baseUrl + "/album/download/back_desktop.jpg')",
            title: '足基学习资料共享下载站',
            width: '50%',
            naviLink: 'https://files.npu5v5.cn',
        },
        {
            url: "url('" + GlobalParams.baseUrl + "/album/download/rm_smile.jpg')",
            title: '加入我们',
            width: '50%',
            naviLink: '',
        },
    ];

    const ImageButton = styled(ButtonBase)(({ theme }) => ({
        position: 'relative',
        height: 400,
        [theme.breakpoints.down('sm')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &.Mui-focusVisible': {
            zIndex: 1,
            '& .MuiImageBackdrop-root': {
                opacity: 0.15,
            },
            '& .MuiImageMarked-root': {
                opacity: 0,
            },
            '& .MuiTypography-root': {
                border: '4px solid currentColor',
            },
        },
    }));

    const ImageSrc = styled('span')({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    });

    const Image = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    }));

    const ImageBackdrop = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    }));

    const ImageMarked = styled('span')(({ theme }) => ({
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    }));

    const openInNewTab = (url: string) => {
        // 👇️ setting target to _blank with window.open
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                minWidth: window.innerWidth - 18,
                width: '100%',
            }}
        >
            {images.map((image) => (
                <ImageButton
                    focusRipple
                    key={image.title}
                    style={{
                        width: image.width,
                    }}
                    onClick={()=>{
                        alert(image.url)
                        openInNewTab(image.naviLink);
                    }}
                >
                    <ImageSrc style={{ backgroundImage: image.url }} />
                    <ImageBackdrop className="MuiImageBackdrop-root" />
                    <Image>
                        <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            sx={{
                                position: 'relative',
                                fontSize: 28,
                                fontFamily: "font5",
                                p: 4,
                                pt: 2,
                                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                            }}
                        >
                            {image.title}
                            <ImageMarked className="MuiImageMarked-root" />
                        </Typography>
                    </Image>
                </ImageButton>
            ))}
        </Box>
    );
};

export default LandingContent;
