import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AnimatedCard } from "@/components/AnimatedCard";
import { PressableScale } from "@/components/PressableScale";
import { useTheme } from "../context/ThemeContext";

interface AvatarOption {
  id: string;
  emoji: string;
  color: string;
}

export default function ProfileSection() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [selectedAvatar, setSelectedAvatar] = useState("oky1");
  const [userName, setUserName] = useState("Сайхан");
  const [isEditingName, setIsEditingName] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const avatars: AvatarOption[] = [
    { id: "oky1", emoji: "😊", color: "#32B8DE" },
    { id: "oky2", emoji: "🌸", color: "#DB307A" },
    { id: "oky3", emoji: "🦋", color: "#A4D233" },
    { id: "oky4", emoji: "🌟", color: "#FFE700" },
    { id: "oky5", emoji: "🌈", color: "#FF9800" },
    { id: "oky6", emoji: "💝", color: "#8F1D80" },
  ];

  const settingsItems = [
    { icon: "notifications", label: "Мэдэгдэл", color: "#FFE700" },
    { icon: "lock-closed", label: "Нууцлал", color: "#DB307A" },
    { icon: "settings", label: "Тохиргоо", color: "#32B8DE" },
    { icon: "help-circle", label: "Тусламж", color: "#A4D233" },
    { icon: "information-circle", label: "Апп-ын тухай", color: "#FF9800" },
  ];

  const selectedAvatarData = avatars.find((a) => a.id === selectedAvatar);

  return (
    <LinearGradient
      colors={
        isDarkMode
          ? ["#1F2937", "#111827", "#581C87"]
          : ["#DBEAFE", "#F3E8FF", "#FCE7F3"]
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
          <View style={styles.headerLeft}>
            <Text style={styles.headerEmoji}>👤</Text>
            <Text
              style={[
                styles.headerTitle,
                { color: isDarkMode ? "#F9A8D4" : "#8F1D80" },
              ]}
            >
              Миний хуудас
            </Text>
          </View>
          <PressableScale onPress={toggleDarkMode} scaleValue={0.9}>
            <LinearGradient
              colors={["#FFE700", "#FF9800"]}
              style={styles.darkModeButton}
            >
              <Ionicons
                name={isDarkMode ? "sunny" : "moon"}
                size={24}
                color="white"
              />
            </LinearGradient>
          </PressableScale>
        </View>

        {/* Profile Card */}
        <AnimatedCard delay={100} bounce>
          <LinearGradient
            colors={
              isDarkMode
                ? ["rgba(88, 28, 135, 0.7)", "rgba(131, 24, 67, 0.7)"]
                : ["rgba(251, 207, 232, 0.9)", "rgba(233, 213, 255, 0.9)"]
            }
            style={styles.profileCard}
          >
            {/* Avatar */}
            <PressableScale
              onPress={() => setShowAvatarPicker(true)}
              style={styles.avatarContainer}
              scaleValue={0.92}
            >
              <View
                style={[
                  styles.avatar,
                  { backgroundColor: selectedAvatarData?.color },
                ]}
              >
                <Text style={styles.avatarEmoji}>
                  {selectedAvatarData?.emoji}
                </Text>
              </View>
              <View
                style={[
                  styles.editBadge,
                  { backgroundColor: isDarkMode ? "#374151" : "white" },
                ]}
              >
                <Text style={styles.editEmoji}>✏️</Text>
              </View>
            </PressableScale>

            {/* Name */}
            {isEditingName ? (
              <TextInput
                value={userName}
                onChangeText={setUserName}
                onBlur={() => setIsEditingName(false)}
                style={[
                  styles.nameInput,
                  {
                    backgroundColor: isDarkMode
                      ? "rgba(55, 65, 81, 0.7)"
                      : "rgba(255, 255, 255, 0.7)",
                    color: isDarkMode ? "#F9A8D4" : "#8F1D80",
                    borderColor: isDarkMode ? "#4B5563" : "white",
                  },
                ]}
                autoFocus
              />
            ) : (
              <PressableScale onPress={() => setIsEditingName(true)} scaleValue={0.98}>
                <Text
                  style={[
                    styles.userName,
                    { color: isDarkMode ? "#F9A8D4" : "#8F1D80" },
                  ]}
                >
                  {userName}
                </Text>
              </PressableScale>
            )}

            {/* Stats */}
            <View style={styles.statsRow}>
              <View
                style={[
                  styles.statBox,
                  {
                    backgroundColor: isDarkMode
                      ? "rgba(55, 65, 81, 0.7)"
                      : "rgba(255, 255, 255, 0.7)",
                  },
                ]}
              >
                <Text style={[styles.statNumber, { color: "#DB307A" }]}>24</Text>
                <Text
                  style={[
                    styles.statLabel,
                    { color: isDarkMode ? "#D1D5DB" : "#4B5563" },
                  ]}
                >
                  Өдөр
                </Text>
              </View>
              <View
                style={[
                  styles.statBox,
                  {
                    backgroundColor: isDarkMode
                      ? "rgba(55, 65, 81, 0.7)"
                      : "rgba(255, 255, 255, 0.7)",
                  },
                ]}
              >
                <Text style={[styles.statNumber, { color: "#32B8DE" }]}>5</Text>
                <Text
                  style={[
                    styles.statLabel,
                    { color: isDarkMode ? "#D1D5DB" : "#4B5563" },
                  ]}
                >
                  Мөчлөг
                </Text>
              </View>
              <View
                style={[
                  styles.statBox,
                  {
                    backgroundColor: isDarkMode
                      ? "rgba(55, 65, 81, 0.7)"
                      : "rgba(255, 255, 255, 0.7)",
                  },
                ]}
              >
                <Text style={[styles.statNumber, { color: "#A4D233" }]}>12</Text>
                <Text
                  style={[
                    styles.statLabel,
                    { color: isDarkMode ? "#D1D5DB" : "#4B5563" },
                  ]}
                >
                  Зөвлөмж
                </Text>
              </View>
            </View>
          </LinearGradient>
        </AnimatedCard>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <AnimatedCard delay={180} style={styles.actionCardWrapper}>
            <LinearGradient
              colors={
                isDarkMode
                  ? ["rgba(21, 94, 117, 0.6)", "rgba(30, 58, 138, 0.6)"]
                  : ["rgba(207, 250, 254, 1)", "rgba(219, 234, 254, 1)"]
              }
              style={styles.actionCard}
            >
              <Text style={styles.actionEmoji}>🎯</Text>
              <Text
                style={[
                  styles.actionText,
                  { color: isDarkMode ? "#E5E7EB" : "#1F2937" },
                ]}
              >
                Зорилго тавих
              </Text>
            </LinearGradient>
          </AnimatedCard>

          <AnimatedCard delay={240} style={styles.actionCardWrapper}>
            <LinearGradient
              colors={
                isDarkMode
                  ? ["rgba(161, 98, 7, 0.6)", "rgba(154, 52, 18, 0.6)"]
                  : ["rgba(254, 240, 138, 1)", "rgba(253, 186, 116, 1)"]
              }
              style={styles.actionCard}
            >
              <Text style={styles.actionEmoji}>🏆</Text>
              <Text
                style={[
                  styles.actionText,
                  { color: isDarkMode ? "#E5E7EB" : "#1F2937" },
                ]}
              >
                Амжилт
              </Text>
            </LinearGradient>
          </AnimatedCard>
        </View>

        {/* Settings */}
        <View style={styles.settingsSection}>
          <View style={styles.settingsHeader}>
            <Text style={styles.settingsEmoji}>⚙️</Text>
            <Text
              style={[
                styles.settingsTitle,
                { color: isDarkMode ? "#E5E7EB" : "#374151" },
              ]}
            >
              Тохиргоо
            </Text>
          </View>

          {settingsItems.map((item, index) => (
            <AnimatedCard key={index} delay={200 + index * 40}>
              <PressableScale scaleValue={0.98}>
                <View
                  style={[
                    styles.settingItem,
                    {
                      backgroundColor: isDarkMode
                        ? "rgba(31, 41, 55, 0.9)"
                        : "rgba(255, 255, 255, 0.9)",
                    },
                  ]}
                >
                  <View style={styles.settingLeft}>
                    <View
                      style={[
                        styles.settingIcon,
                        {
                          backgroundColor: `${item.color}40`,
                          borderColor: isDarkMode ? "#4B5563" : "white",
                        },
                      ]}
                    >
                      <Ionicons
                        name={item.icon as any}
                        size={26}
                        color={item.color}
                      />
                    </View>
                    <Text
                      style={[
                        styles.settingLabel,
                        { color: isDarkMode ? "#E5E7EB" : "#1F2937" },
                      ]}
                    >
                      {item.label}
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={22}
                    color={isDarkMode ? "#9CA3AF" : "#9CA3AF"}
                  />
                </View>
              </PressableScale>
            </AnimatedCard>
          ))}
        </View>

        {/* App Info */}
        <AnimatedCard delay={320}>
          <LinearGradient
            colors={
              isDarkMode
                ? ["rgba(88, 28, 135, 0.5)", "rgba(131, 24, 67, 0.5)"]
                : ["rgba(233, 213, 255, 0.6)", "rgba(251, 207, 232, 0.6)"]
            }
            style={styles.appInfo}
          >
            <Text
              style={[
                styles.appName,
                { color: isDarkMode ? "#E5E7EB" : "#374151" },
              ]}
            >
              Oky Period Tracker
            </Text>
            <Text
              style={[
                styles.appVersion,
                { color: isDarkMode ? "#D1D5DB" : "#4B5563" },
              ]}
            >
              Хувилбар 1.0.0
            </Text>
            <Text style={[styles.appWebsite, { color: "#32B8DE" }]}>
              www.okyapp.info
            </Text>
          </LinearGradient>
        </AnimatedCard>
      </ScrollView>

      {/* Avatar Picker Modal */}
      <Modal
        visible={showAvatarPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAvatarPicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowAvatarPicker(false)}
        >
          <View
            style={[
              styles.modalContent,
              { backgroundColor: isDarkMode ? "#1F2937" : "white" },
            ]}
          >
            <Text
              style={[
                styles.modalTitle,
                { color: isDarkMode ? "#F9A8D4" : "#8F1D80" },
              ]}
            >
              Дүр сонгох
            </Text>
            <View style={styles.avatarGrid}>
              {avatars.map((avatar) => (
                <PressableScale
                  key={avatar.id}
                  onPress={() => {
                    setSelectedAvatar(avatar.id);
                    setShowAvatarPicker(false);
                  }}
                  scaleValue={0.9}
                >
                  <View
                    style={[
                      styles.avatarOption,
                      {
                        backgroundColor: avatar.color,
                        borderColor:
                          selectedAvatar === avatar.id
                            ? "white"
                            : isDarkMode
                              ? "#4B5563"
                              : "rgba(255, 255, 255, 0.5)",
                        borderWidth: selectedAvatar === avatar.id ? 4 : 4,
                      },
                    ]}
                  >
                    <Text style={styles.avatarOptionEmoji}>{avatar.emoji}</Text>
                  </View>
                </PressableScale>
              ))}
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
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerEmoji: {
    fontSize: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  darkModeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  profileCard: {
    marginHorizontal: 16,
    marginTop: 8,
    padding: 32,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: "transparent",
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 4,
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarEmoji: {
    fontSize: 64,
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  editEmoji: {
    fontSize: 20,
  },
  userName: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 16,
  },
  nameInput: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 2,
    textAlign: "center",
  },
  statsRow: {
    flexDirection: "row",
    gap: 24,
    marginTop: 24,
  },
  statBox: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
  quickActions: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 16,
    gap: 12,
  },
  actionCardWrapper: {
    flex: 1,
  },
  actionCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "white",
    alignItems: "center",
  },
  actionEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  settingsSection: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  settingsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  settingsEmoji: {
    fontSize: 24,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: "white",
    marginBottom: 12,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  settingIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  appInfo: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
  },
  appName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  appVersion: {
    fontSize: 12,
    marginTop: 4,
  },
  appWebsite: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalContent: {
    borderRadius: 24,
    padding: 24,
    width: "100%",
    maxWidth: 360,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  avatarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  avatarOption: {
    width: 100,
    height: 100,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarOptionEmoji: {
    fontSize: 48,
  },
});
