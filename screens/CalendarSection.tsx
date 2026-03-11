import { AnimatedCard } from "@/components/AnimatedCard";
import { PressableScale } from "@/components/PressableScale";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "../context/ThemeContext";

export default function CalendarSection() {
  const [showMonthView, setShowMonthView] = useState(false);
  const { isDarkMode } = useTheme();

  const todayStats = {
    day: 12,
    status: "Өндгөн эс гадагшлах үе",
    symptoms: ["Толгой өвдөх", "Ядрах"],
  };

  const weeklyData = [
    { day: "Да", date: 4, hasSymptom: false, isPeriod: false },
    { day: "Мя", date: 5, hasSymptom: true, isPeriod: false },
    { day: "Лх", date: 6, hasSymptom: false, isPeriod: false },
    { day: "Пү", date: 7, hasSymptom: false, isPeriod: false },
    { day: "Ба", date: 8, hasSymptom: true, isPeriod: false },
    { day: "Бя", date: 9, hasSymptom: false, isPeriod: false },
    { day: "Ня", date: 10, hasSymptom: false, isPeriod: true },
  ];

  const funFacts = [
    "Сарын тэмдэг нь эрүүл мэндийн үзүүлэлт юм!",
    "Усанд хөвөх нь хэвийн байдал.",
    "Дасгал хөдөлгөөн өвдөлтийг багасгана.",
    "Хүрэл эрдэс их хэрэглэ - төмөр ихтэй хоол идээрэй!",
  ];

  const currentFact = funFacts[Math.floor(Math.random() * funFacts.length)];

  const mascotX = useSharedValue(0);
  const mascotY = useSharedValue(0);

  useEffect(() => {
    const softEase = Easing.inOut(Easing.ease);

    mascotX.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 3000, easing: softEase }),
        withTiming(8, { duration: 3000, easing: softEase })
      ),
      -1,
      true
    );

    mascotY.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 1200, easing: softEase }),
        withTiming(-8, { duration: 600, easing: softEase }),
        withTiming(0, { duration: 900, easing: softEase })
      ),
      -1,
      false
    );
  }, []);

  const mascotAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: mascotX.value }, { translateY: mascotY.value }],
  }));

  return (
    <LinearGradient
      colors={
        isDarkMode
          ? ["#1F2937", "#111827", "#1F2937"]
          : ["#FCE7F3", "#FEF9C3", "#DBEAFE"]
      }
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("../assets/images/icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <PressableScale
            onPress={() => setShowMonthView(true)}
            style={styles.calendarButton}
          >
            <LinearGradient
              colors={["#DB307A", "#8F1D80"]}
              style={styles.gradientButton}
            >
              <Ionicons name="calendar" size={24} color="white" />
            </LinearGradient>
          </PressableScale>
        </View>

        <View style={styles.statsSection}>
          <Animated.View
            style={[styles.mascotBackdrop, mascotAnimatedStyle]}
            pointerEvents="none"
          >
            <Image
              source={require("../assets/images/oky.png")}
              style={styles.mascotBackdropImage}
              resizeMode="contain"
            />
          </Animated.View>

          {/* Today's Stats */}
          <AnimatedCard delay={100} bounce>
            <LinearGradient
              colors={
                isDarkMode
                  ? ["rgba(219, 48, 122, 0.4)", "rgba(143, 29, 128, 0.4)"]
                  : ["rgba(251, 207, 232, 0.8)", "rgba(233, 213, 255, 0.8)"]
              }
              style={styles.statsCard}
            >
            <View style={styles.statsHeader}>
              <LinearGradient
                colors={["#DB307A", "#8F1D80"]}
                style={styles.iconCircle}
              >
                <Text style={styles.iconEmoji}>📅</Text>
              </LinearGradient>
              <Text
                style={[
                  styles.statsTitle,
                  { color: isDarkMode ? "#F9A8D4" : "#8F1D80" },
                ]}
              >
                Өнөөдрийн мэдээлэл
              </Text>
            </View>

            <View
              style={[
                styles.statRow,
                {
                  backgroundColor: isDarkMode
                    ? "rgba(55, 65, 81, 0.6)"
                    : "rgba(255, 255, 255, 0.6)",
                },
              ]}
            >
              <Text
                style={[
                  styles.statLabel,
                  { color: isDarkMode ? "#E5E7EB" : "#374151" },
                ]}
              >
                Циклийн өдөр:
              </Text>
              <View style={styles.statValue}>
                <Text style={[styles.statNumber, { color: "#DB307A" }]}>
                  {todayStats.day}
                </Text>
                <Text style={styles.targetEmoji}>🎯</Text>
              </View>
            </View>

            <LinearGradient
              colors={["rgba(50, 184, 222, 0.3)", "rgba(164, 210, 51, 0.3)"]}
              style={styles.statRow}
            >
              <Text
                style={[
                  styles.statLabel,
                  { color: isDarkMode ? "#E5E7EB" : "#374151" },
                ]}
              >
                Төлөв:
              </Text>
              <Text style={[styles.statusText, { color: "#32B8DE" }]}>
                {todayStats.status}
              </Text>
            </LinearGradient>

            {todayStats.symptoms.length > 0 && (
              <LinearGradient
                colors={
                  isDarkMode
                    ? ["rgba(161, 98, 7, 0.4)", "rgba(154, 52, 18, 0.4)"]
                    : ["rgba(254, 243, 199, 1)", "rgba(254, 215, 170, 1)"]
                }
                style={styles.symptomsCard}
              >
                <View style={styles.symptomsHeader}>
                  <Text style={styles.symptomEmoji}>💊</Text>
                  <Text
                    style={[
                      styles.symptomsLabel,
                      { color: isDarkMode ? "#E5E7EB" : "#374151" },
                    ]}
                  >
                    Шинж тэмдэг:
                  </Text>
                </View>
                <View style={styles.symptomsList}>
                  {todayStats.symptoms.map((symptom, index) => (
                    <View
                      key={index}
                      style={[
                        styles.symptomBadge,
                        {
                          backgroundColor:
                            index % 2 === 0 ? "#FF9800" : "#A4D233",
                        },
                      ]}
                    >
                      <Text style={styles.symptomText}>{symptom}</Text>
                    </View>
                  ))}
                </View>
              </LinearGradient>
            )}
            </LinearGradient>
          </AnimatedCard>
        </View>

        {/* Weekly Stats */}
        <View style={styles.weeklySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionEmoji}>📊</Text>
            <Text
              style={[
                styles.sectionTitle,
                { color: isDarkMode ? "#F9A8D4" : "#8F1D80" },
              ]}
            >
              7 хоногийн үзүүлэлт
            </Text>
          </View>

          <AnimatedCard delay={200}>
            <LinearGradient
              colors={
                isDarkMode
                  ? ["rgba(30, 58, 138, 0.6)", "rgba(21, 94, 117, 0.6)"]
                  : ["rgba(219, 234, 254, 1)", "rgba(207, 250, 254, 1)"]
              }
              style={styles.weeklyCard}
            >
              <View style={styles.weeklyDays}>
                {weeklyData.map((day, index) => (
                  <View key={index} style={styles.dayColumn}>
                    <Text
                      style={[
                        styles.dayLabel,
                        { color: isDarkMode ? "#D1D5DB" : "#4B5563" },
                      ]}
                    >
                      {day.day}
                    </Text>
                    <View
                      style={[
                        styles.dayCircle,
                        {
                          backgroundColor: day.isPeriod
                            ? "#DB307A"
                            : day.hasSymptom
                              ? "#FFE700"
                              : isDarkMode
                                ? "#4B5563"
                                : "white",
                          borderColor:
                            day.isPeriod || day.hasSymptom
                              ? "white"
                              : isDarkMode
                                ? "#6B7280"
                                : "#E5E7EB",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.dayNumber,
                          {
                            color: day.isPeriod
                              ? "white"
                              : isDarkMode
                                ? "#E5E7EB"
                                : "#1F2937",
                          },
                        ]}
                      >
                        {day.date}
                      </Text>
                      {day.hasSymptom && !day.isPeriod && (
                        <View style={styles.symptomDot} />
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </LinearGradient>
          </AnimatedCard>
        </View>

        {/* Fun Fact */}
        <AnimatedCard delay={260}>
          <LinearGradient
            colors={
              isDarkMode
                ? ["rgba(202, 138, 4, 0.3)", "rgba(194, 65, 12, 0.3)"]
                : ["rgba(254, 240, 138, 0.5)", "rgba(253, 186, 116, 0.5)"]
            }
            style={styles.funFactCard}
          >
            <Text style={styles.bulbEmoji}>💡</Text>
            <View style={styles.funFactContent}>
              <Text
                style={[
                  styles.funFactTitle,
                  { color: isDarkMode ? "#F9A8D4" : "#8F1D80" },
                ]}
              >
                Өнөөдрийн зөвлөгөө
              </Text>
              <Text
                style={[
                  styles.funFactText,
                  { color: isDarkMode ? "#E5E7EB" : "#1F2937" },
                ]}
              >
                {currentFact}
              </Text>
            </View>
          </LinearGradient>
        </AnimatedCard>

        {/* Wellness Tips */}
        <View style={styles.tipsRow}>
          <AnimatedCard delay={320} style={styles.tipCardWrapper}>
            <LinearGradient
              colors={
                isDarkMode
                  ? ["rgba(20, 83, 45, 0.5)", "rgba(77, 124, 15, 0.5)"]
                  : ["rgba(187, 247, 208, 1)", "rgba(217, 249, 157, 1)"]
              }
              style={styles.tipCard}
            >
              <Text style={styles.tipEmoji}>💧</Text>
              <Text
                style={[
                  styles.tipTitle,
                  { color: isDarkMode ? "#E5E7EB" : "#1F2937" },
                ]}
              >
                Ус их уу!
              </Text>
              <Text
                style={[
                  styles.tipSubtitle,
                  { color: isDarkMode ? "#D1D5DB" : "#4B5563" },
                ]}
              >
                Өдөрт 6-8 аяга
              </Text>
            </LinearGradient>
          </AnimatedCard>

          <AnimatedCard delay={380} style={styles.tipCardWrapper}>
            <LinearGradient
              colors={
                isDarkMode
                  ? ["rgba(88, 28, 135, 0.5)", "rgba(131, 24, 67, 0.5)"]
                  : ["rgba(233, 213, 255, 1)", "rgba(251, 207, 232, 1)"]
              }
              style={styles.tipCard}
            >
              <Text style={styles.tipEmoji}>🧘‍♀️</Text>
              <Text
                style={[
                  styles.tipTitle,
                  { color: isDarkMode ? "#E5E7EB" : "#1F2937" },
                ]}
              >
                Амраарай
              </Text>
              <Text
                style={[
                  styles.tipSubtitle,
                  { color: isDarkMode ? "#D1D5DB" : "#4B5563" },
                ]}
              >
                Нойр сайн авах
              </Text>
            </LinearGradient>
          </AnimatedCard>
        </View>
      </ScrollView>

      {/* Month View Modal */}
      <Modal
        visible={showMonthView}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMonthView(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowMonthView(false)}
        >
          <View style={styles.modalContent}>
            <Text style={[styles.modalTitle, { color: "#8F1D80" }]}>
              2026 оны 3-р сар
            </Text>
            <View style={styles.calendarGrid}>
              {["Ня", "Да", "Мя", "Лх", "Пү", "Ба", "Бя"].map((day) => (
                <Text key={day} style={styles.calendarDay}>
                  {day}
                </Text>
              ))}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
                <View
                  key={date}
                  style={[
                    styles.calendarDate,
                    {
                      backgroundColor:
                        date >= 10 && date <= 14
                          ? "#DB307A"
                          : date === 10
                            ? "#FFE700"
                            : "#F3F4F6",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.calendarDateText,
                      { color: date >= 10 && date <= 14 ? "white" : "#1F2937" },
                    ]}
                  >
                    {date}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View
                  style={[styles.legendBox, { backgroundColor: "#DB307A" }]}
                />
                <Text style={styles.legendText}>Сарын тэмдэг</Text>
              </View>
              <View style={styles.legendItem}>
                <View
                  style={[styles.legendBox, { backgroundColor: "#FFE700" }]}
                />
                <Text style={styles.legendText}>Шинж тэмдэг</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingTop: 60,
  },
  logo: {
    height: 56,
    width: 120,
  },
  calendarButton: {
    borderRadius: 50,
    overflow: "hidden",
  },
  gradientButton: {
    padding: 12,
    borderRadius: 50,
  },
  statsSection: {
    position: "relative",
    marginTop: 8,
  },
  mascotBackdrop: {
    position: "absolute",
    top: -110,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 0,
  },
  mascotBackdropImage: {
    width: 260,
    height: 260,
  },
  statsCard: {
    marginHorizontal: 16,
    padding: 24,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: "white",
    zIndex: 1,
  },
  statsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  iconEmoji: {
    fontSize: 24,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  statValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "bold",
  },
  targetEmoji: {
    fontSize: 24,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  symptomsCard: {
    padding: 16,
    borderRadius: 16,
  },
  symptomsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  symptomEmoji: {
    fontSize: 20,
  },
  symptomsLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  symptomsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  symptomBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  symptomText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  weeklySection: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  sectionEmoji: {
    fontSize: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  weeklyCard: {
    padding: 20,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: "white",
  },
  weeklyDays: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dayColumn: {
    alignItems: "center",
    gap: 8,
  },
  dayLabel: {
    fontSize: 10,
    fontWeight: "bold",
  },
  dayCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  dayNumber: {
    fontSize: 14,
    fontWeight: "bold",
  },
  symptomDot: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#FF9800",
    borderWidth: 2,
    borderColor: "white",
  },
  funFactCard: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: "white",
    gap: 16,
  },
  bulbEmoji: {
    fontSize: 32,
  },
  funFactContent: {
    flex: 1,
  },
  funFactTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  funFactText: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  tipsRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 16,
    gap: 12,
  },
  tipCardWrapper: {
    flex: 1,
  },
  tipCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "white",
    alignItems: "center",
  },
  tipEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  tipSubtitle: {
    fontSize: 10,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 24,
    width: "100%",
    maxWidth: 360,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  calendarDay: {
    width: "12.5%",
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold",
    color: "#6B7280",
    marginBottom: 8,
  },
  calendarDate: {
    width: "12.5%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  calendarDateText: {
    fontSize: 12,
  },
  legendRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 10,
  },
});
