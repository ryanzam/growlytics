import { useAuth } from '@/contexts/AuthContext'
import { DetectionResult } from '@/interfaces'
import { detectPlantDisease, saveDetectionResult } from '@/services/aiService'
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera'
import { AlertCircle, Camera, CheckCircle, ImageIcon, Lightbulb, RotateCcw, Scan, XCircle } from 'lucide-react-native'
import React, { useRef, useState } from 'react'
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Header from '../components/Header'

const IdentifyTab = () => {

    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [showCamera, setShowCamera] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
    const cameraRef = useRef<CameraView>(null);

    const { user } = useAuth();

    if (!permission) {
        return <View style={styles.container} />;
    }

    if (!permission.granted) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.permissionContainer}>
                    <Camera size={64} color="#6b7280" />
                    <Text style={styles.permissionTitle}>Camera Permission Required</Text>
                    <Text style={styles.permissionText}>
                        We need camera access to help you detect plant diseases and pests
                    </Text>
                    <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
                        <Text style={styles.permissionButtonText}>Grant Permission</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync();
                if (photo) {
                    setCapturedImage(photo.uri);
                    setShowCamera(false);
                    analyzeImage(photo.uri);
                }
            } catch (error) {
                Alert.alert('Error', 'Failed to take picture');
            }
        }
    };

    const analyzeImage = async (imageUri: string) => {
        if (!user) return

        setIsAnalyzing(true);

        try {
            const result = await detectPlantDisease(imageUri);
            setDetectionResult(result);

            // Save detection to database
            await saveDetectionResult(user.id, imageUri, result);
        } catch (error) {
            console.error('Error analyzing image:', error);
            Alert.alert('Error', 'Failed to analyze image');
        } finally {
            setIsAnalyzing(false);
        }
    }

    const resetDetection = () => {
        setCapturedImage(null);
        setDetectionResult(null);
        setIsAnalyzing(false);
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'low': return '#09712f';
            case 'medium': return '#f59e0b';
            case 'high': return '#ef4444';
            default: return '#6b7280';
        }
    };

    const getSeverityIcon = (severity: string) => {
        switch (severity) {
            case 'low': return <CheckCircle size={20} color="#09712f" />;
            case 'medium': return <AlertCircle size={20} color="#f59e0b" />;
            case 'high': return <XCircle size={20} color="#ef4444" />;
            default: return <AlertCircle size={20} color="#6b7280" />;
        }
    };

    if (showCamera) {
        return (
            <View style={styles.cameraContainer}>
                <CameraView
                    ref={cameraRef}
                    style={styles.camera}
                    facing={facing}
                >
                    <View style={styles.cameraOverlay}>
                        <View style={styles.cameraHeader}>
                            <TouchableOpacity
                                style={styles.cameraButton}
                                onPress={() => setShowCamera(false)}
                            >
                                <Text style={styles.cameraButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cameraButton}
                                onPress={() => setFacing(current => (current === 'back' ? 'front' : 'back'))}
                            >
                                <RotateCcw size={24} color="#ffffff" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.scanFrame}>
                            <View style={styles.scanCorner} />
                            <View style={[styles.scanCorner, styles.scanCornerTopRight]} />
                            <View style={[styles.scanCorner, styles.scanCornerBottomLeft]} />
                            <View style={[styles.scanCorner, styles.scanCornerBottomRight]} />
                        </View>

                        <View style={styles.cameraFooter}>
                            <Text style={styles.cameraInstructions}>
                                Position the affected plant part within the frame
                            </Text>
                            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                                <View style={styles.captureButtonInner} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </CameraView>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <Header title='Pest & Disease Detection' subtitle='कीट र रोग पहिचान' />

                {!capturedImage && !detectionResult && (
                    <View style={styles.mainContent}>
                        <View style={styles.instructionCard}>
                            <Scan size={48} color="#09712f" />
                            <Text style={styles.instructionTitle}>AI-Powered Plant Doctor</Text>
                            <Text style={styles.instructionText}>
                                Take a photo of your plant to get instant disease and pest detection with treatment recommendations
                            </Text>
                        </View>

                        <View style={styles.actionButtons}>
                            <TouchableOpacity
                                style={styles.primaryButton}
                                onPress={() => setShowCamera(true)}
                            >
                                <Camera size={24} color="#ffffff" />
                                <Text style={styles.primaryButtonText}>Take Photo</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.secondaryButton}>
                                <ImageIcon size={24} color="#09712f" />
                                <Text style={styles.secondaryButtonText}>Choose from Gallery</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.tipsCard}>
                            <Lightbulb size={24} color="#f59e0b" />
                            <View style={styles.tipsContent}>
                                <Text style={styles.tipsTitle}>Tips for Better Detection</Text>
                                <Text style={styles.tipsText}>• Take photos in good lighting</Text>
                                <Text style={styles.tipsText}>• Focus on affected areas</Text>
                                <Text style={styles.tipsText}>• Keep the plant steady</Text>
                                <Text style={styles.tipsText}>• Avoid shadows and reflections</Text>
                            </View>
                        </View>
                    </View>
                )}

                {isAnalyzing && (
                    <View style={styles.analyzingContainer}>
                        <View style={styles.analyzingCard}>
                            <View style={styles.loadingSpinner} />
                            <Text style={styles.analyzingTitle}>Analyzing Image...</Text>
                            <Text style={styles.analyzingText}>
                                Our AI is examining your plant for diseases and pests
                            </Text>
                        </View>
                    </View>
                )}

                {detectionResult && (
                    <View style={styles.resultContainer}>
                        <View style={styles.resultCard}>
                            <Image source={{ uri: detectionResult.image }} style={styles.resultImage} />

                            <View style={styles.resultHeader}>
                                <View>
                                    <Text style={styles.diseaseName}>{detectionResult.disease}</Text>
                                    <Text style={styles.diseaseNepaliName}>{detectionResult.nepaliName}</Text>
                                </View>
                                <View style={styles.confidenceContainer}>
                                    <Text style={styles.confidenceText}>{detectionResult.confidence}%</Text>
                                    <Text style={styles.confidenceLabel}>Confidence</Text>
                                </View>
                            </View>

                            <View style={styles.severityContainer}>
                                {getSeverityIcon(detectionResult.severity)}
                                <Text style={[styles.severityText, { color: getSeverityColor(detectionResult.severity) }]}>
                                    {detectionResult.severity.toUpperCase()} SEVERITY
                                </Text>
                            </View>

                            <Text style={styles.description}>{detectionResult.description}</Text>

                            <View style={styles.treatmentSection}>
                                <Text style={styles.sectionTitle}>Treatment Recommendations</Text>
                                {detectionResult.treatment.map((treatment, index) => (
                                    <View key={index} style={styles.listItem}>
                                        <View style={styles.listBullet} />
                                        <Text style={styles.listText}>{treatment}</Text>
                                    </View>
                                ))}
                            </View>

                            <View style={styles.preventionSection}>
                                <Text style={styles.sectionTitle}>Prevention Tips</Text>
                                {detectionResult.prevention.map((prevention, index) => (
                                    <View key={index} style={styles.listItem}>
                                        <View style={styles.listBullet} />
                                        <Text style={styles.listText}>{prevention}</Text>
                                    </View>
                                ))}
                            </View>

                            <TouchableOpacity style={styles.resetButton} onPress={resetDetection}>
                                <Text style={styles.resetButtonText}>Detect Another Plant</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

export default IdentifyTab

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    scrollView: {
        flex: 1,
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    permissionTitle: {
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
        color: '#1f2937',
        marginTop: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    permissionText: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#6b7280',
        textAlign: 'center',
        marginBottom: 32,
    },
    permissionButton: {
        backgroundColor: '#09712f',
        borderRadius: 12,
        paddingHorizontal: 32,
        paddingVertical: 16,
    },
    permissionButtonText: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#ffffff',
    },
    mainContent: {
        padding: 20,
    },
    instructionCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    instructionTitle: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: '#1f2937',
        marginTop: 16,
        marginBottom: 8,
        textAlign: 'center',
    },
    instructionText: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#6b7280',
        textAlign: 'center',
        lineHeight: 24,
    },
    actionButtons: {
        marginBottom: 24,
    },
    primaryButton: {
        backgroundColor: '#09712f',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    primaryButtonText: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#ffffff',
        marginLeft: 8,
    },
    secondaryButton: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderWidth: 2,
        borderColor: '#09712f',
    },
    secondaryButtonText: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#09712f',
        marginLeft: 8,
    },
    tipsCard: {
        backgroundColor: '#fef3c7',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    tipsContent: {
        flex: 1,
        marginLeft: 12,
    },
    tipsTitle: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#92400e',
        marginBottom: 8,
    },
    tipsText: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#92400e',
        marginBottom: 2,
    },
    cameraContainer: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    cameraOverlay: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    cameraHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingTop: 60,
    },
    cameraButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    cameraButtonText: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: '#ffffff',
    },
    scanFrame: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 250,
        height: 250,
        marginTop: -125,
        marginLeft: -125,
    },
    scanCorner: {
        position: 'absolute',
        width: 30,
        height: 30,
        borderTopWidth: 3,
        borderLeftWidth: 3,
        borderColor: '#09712f',
        top: 0,
        left: 0,
    },
    scanCornerTopRight: {
        borderTopWidth: 3,
        borderRightWidth: 3,
        borderLeftWidth: 0,
        top: 0,
        right: 0,
        left: 'auto',
    },
    scanCornerBottomLeft: {
        borderBottomWidth: 3,
        borderLeftWidth: 3,
        borderTopWidth: 0,
        bottom: 0,
        top: 'auto',
        left: 0,
    },
    scanCornerBottomRight: {
        borderBottomWidth: 3,
        borderRightWidth: 3,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        bottom: 0,
        right: 0,
        top: 'auto',
        left: 'auto',
    },
    cameraFooter: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        paddingBottom: 60,
    },
    cameraInstructions: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 32,
        paddingHorizontal: 20,
    },
    captureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButtonInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#09712f',
    },
    analyzingContainer: {
        padding: 20,
    },
    analyzingCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 32,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    loadingSpinner: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 4,
        borderColor: '#e5e7eb',
        borderTopColor: '#09712f',
        marginBottom: 16,
    },
    analyzingTitle: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: '#1f2937',
        marginBottom: 8,
    },
    analyzingText: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#6b7280',
        textAlign: 'center',
    },
    resultContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    resultCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    resultImage: {
        width: '100%',
        height: 200,
    },
    resultHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 20,
        paddingBottom: 12,
    },
    diseaseName: {
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
        color: '#1f2937',
    },
    diseaseNepaliName: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        color: '#6b7280',
        marginTop: 4,
    },
    confidenceContainer: {
        alignItems: 'center',
    },
    confidenceText: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: '#09712f',
    },
    confidenceLabel: {
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
        color: '#6b7280',
    },
    severityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    severityText: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
        marginLeft: 8,
    },
    description: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#374151',
        lineHeight: 24,
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    treatmentSection: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    preventionSection: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: '#1f2937',
        marginBottom: 12,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    listBullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#09712f',
        marginTop: 6,
        marginRight: 12,
    },
    listText: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#374151',
        flex: 1,
        lineHeight: 20,
    },
    resetButton: {
        backgroundColor: '#09712f',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    resetButtonText: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#ffffff',
    },
});