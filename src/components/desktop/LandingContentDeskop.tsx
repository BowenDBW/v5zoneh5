import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import {getWithoutToken} from "../utils/Request";

const LandingContentDesktop = (props: any) => {

    const unitHeight = 300;
    const {setContentHeight} = props;
    const [blocks, setBlocks] = React.useState<any>([]);

    const getFileType = (fileName: string) => {
        const suffix = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
        if (suffix === "md") {
            return "md";
        } else if (suffix === "pdf") {
            return "pdf";
        } else if (suffix === "html") {
            return "html";
        } else {
            return "";
        }
    }

    const calHeight = (count: number) => {
        if (count === 0) {
            return 0;
        } else if (count % 3 === 0) {
            return -count / 3 * unitHeight;
        } else {
            return -((count - count % 3) / 3 + 1) * unitHeight;
        }
    }

    const calWidth = (serial: number, count: number) => {
        if (count % 3 === 0) {
            if (serial % 3 === 1) {
                return "34%";
            } else {
                return "33%";
            }
        } else if (count % 3 === 1) {
            if ((count - count % 3 - 3) <= serial) {
                return "50%";
            } else {
                if (serial % 3 === 1) {
                    return "34%";
                } else {
                    return "33%";
                }
            }
        } else {
            if ((count - count % 3) <= serial) {
                return "50%";
            } else {
                if (serial % 3 === 1) {
                    return "34%";
                } else {
                    return "33%";
                }
            }
        }
    }

    const init = () => {
        getWithoutToken("/public-article/all").then((res: any) => {
            if (res.status === 200) {
                const count: number = res.data.length;
                setContentHeight(calHeight(count));
                const list = res.data.reverse();
                list.map((item: any, index: number) => {
                    item.url = "url('" + item.imageLink + "')";
                    item.naviLink = window.location.origin
                        + "/#/"
                        + getFileType(item.fileLink)
                        + "?fileLink="
                        + item.fileLink
                        + "&isOutside=true";
                    item.width = calWidth(index, count);
                });
                setBlocks(list);
            }
        })
    }

    React.useEffect(() => {
        init();
    }, [])

    const ImageButton = styled(ButtonBase)(({theme}) => ({
        position: 'relative',
        height: unitHeight,
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

    const Image = styled('span')(({theme}) => ({
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

    const ImageBackdrop = styled('span')(({theme}) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    }));

    const ImageMarked = styled('span')(({theme}) => ({
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
        window.open(url);
    };

    return (
        <Box>
            {blocks.map((image: any) => (
                <ImageButton
                    focusRipple
                    key={image.title}
                    style={{
                        width: image.width,
                    }}
                    onClick={() => {
                        openInNewTab(image.naviLink);
                    }}
                >
                    <ImageSrc style={{backgroundImage: image.url}}/>
                    <ImageBackdrop className="MuiImageBackdrop-root"/>
                    <Image>
                        <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            sx={{
                                position: 'relative',
                                fontSize: 36,
                                fontFamily: "font5",
                                p: 4,
                                pt: 2,
                                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                            }}
                        >
                            {image.title}
                            <ImageMarked className="MuiImageMarked-root"/>
                        </Typography>
                    </Image>
                </ImageButton>
            ))}
        </Box>
    );
};

export default LandingContentDesktop;
