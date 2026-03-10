import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AnimatedCard } from "@/components/AnimatedCard";
import { PressableScale } from "@/components/PressableScale";
import { API_BASE_URL } from "@/constants/api";
import { useTheme } from "../context/ThemeContext";

interface CategoryType {
  id: string;
  title: string;
  icon: string;
  color: string;
  content: string[];
}

export default function InformationSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isChatMode, setIsChatMode] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Сайн уу! Би танд сарын тэмдгийн талаар туслах болно. Асуултаа асуугаарай! 😊",
      isUser: false,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { isDarkMode } = useTheme();

  const categories: CategoryType[] = [
    {
      id: "basics",
      title: "Сарын тэмдгийн үндэс",
      icon: "📚",
      color: "#32B8DE",
      content: [
        "Сарын тэмдэг гэж юу вэ?",
        "Сарын тэмдэг нь эмэгтэй хүний биед сар бүр болдог байгалийн үйл явц юм.",
        "Энэ нь таны бие хүүхэдтэй болоход бэлдэж байгааг харуулна.",
        "Ихэнх охид 9-16 насандаа анхны сарын тэмдгээ авдаг.",
        "Энэ бол эрүүл мэндийн хэвийн үзүүлэлт!",
      ],
    },
    {
      id: "hygiene",
      title: "Эрүүл ахуй",
      icon: "🧼",
      color: "#A4D233",
      content: [
        "Цэвэр байдал хэрхэн сахих вэ?",
        "Өдөрт хэд хэдэн удаа эрүүл ахуйн хэрэгсэл солих хэрэгтэй.",
        "Үргэлж гараа угаагаарай - өмнө болон дараа нь.",
        "Эрүүл ахуйн хэрэгслээ хаягдах савнаас хаягаарай.",
        "Тав тухтай, амьсгалдаг хувцас өмсөөрэй.",
      ],
    },
    {
      id: "symptoms",
      title: "Шинж тэмдэг ба өвдөлт",
      icon: "💊",
      color: "#DB307A",
      content: [
        "Хэвийн шинж тэмдгүүд:",
        "Гэдэс өвдөх - энэ нь их тохиолддог.",
        "Толгой өвдөх, хөл нуруу өвдөх.",
        "Сэтгэл санааны өөрчлөлт - уурлах, гунигтай байх.",
        "Усанд хөвөх, өдөржин ядрах.",
        "Бага зэрэг дасгал хөдөлгөөн хийвэл тусалдаг!",
      ],
    },
    {
      id: "nutrition",
      title: "Хоол тэжээл",
      icon: "🥗",
      color: "#FF9800",
      content: [
        "Юу идэх вэ?",
        "Төмөр ихтэй хоол: мах, ногоо, самар.",
        "Ус их уух - өдөрт 6-8 аяга.",
        "Жимс жимсгэнэ, бүтэн үрийн тариа идээрэй.",
        "Шоколад, кофейн багатай хэрэглээрэй.",
        "Кальци ихтэй хоол: сүү, бяслаг.",
      ],
    },
    {
      id: "exercise",
      title: "Дасгал хөдөлгөөн",
      icon: "🏃‍♀️",
      color: "#FFE700",
      content: [
        "Сарын тэмдгийн үед дасгал хийж болох уу?",
        "Тийм! Дасгал өвдөлтийг багасгана.",
        "Алхах, жога, сунгах дасгал сайн.",
        "Сэлэх, усанд сэлэх ч гайхалтай.",
        "Өөрийгөө сонсоорой - их ядарч байвал амраарай.",
      ],
    },
    {
      id: "emotions",
      title: "Сэтгэл санаа",
      icon: "💭",
      color: "#8F1D80",
      content: [
        "Сэтгэл санааны өөрчлөлт",
        "Гормоны өөрчлөлтөөс болж сэтгэл санаа өөрчлөгддөг.",
        "Энэ бол хэвийн байдал гэдгийг санаарай.",
        "Найз нөхөд, гэр бүлтэй ярилцаарай.",
        "Дуртай зүйлээ хий - хөгжим сонсох, зурах.",
        "Хэрэв хэтэрхий гунигтай байвал насанд хүрэгчдээс тусламж хүс.",
      ],
    },
  ];

  const handleSendMessage = async () => {
    const trimmed = inputMessage.trim();
    if (!trimmed || isSending) return;

    const userMessage = { text: trimmed, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsSending(true);

    try {
      const res = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok) {
        throw new Error(`Chat API error: ${res.status}`);
      }

      const data = await res.json();
      const replyText =
        typeof data?.reply === "string" && data.reply.trim().length > 0
          ? data.reply
          : "Уучлаарай, одоогоор хариулж чадсангүй. Дахин оролдоно уу.";

      setMessages((prev) => [...prev, { text: replyText, isUser: false }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: "Уучлаарай, холболт амжилтгүй боллоо. Дахин оролдоно уу.",
          isUser: false,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const selectedCat = categories.find((c) => c.id === selectedCategory);
  const canSend = inputMessage.trim().length > 0 && !isSending;

  return (
    <LinearGradient
      colors={
        isDarkMode
          ? ["#1F2937", "#581C87", "#111827"]
          : ["#F3E8FF", "#FCE7F3", "#FEF9C3"]
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
          <View style={styles.titleRow}>
            <Text style={styles.headerEmoji}>📚</Text>
            <Text
              style={[
                styles.headerTitle,
                { color: isDarkMode ? "#F9A8D4" : "#8F1D80" },
              ]}
            >
              Мэдээлэл ба Зөвлөгөө
            </Text>
            <Text style={styles.headerEmoji}>💬</Text>
          </View>

          {/* Mode Toggle */}
          <View style={styles.toggleRow}>
            <PressableScale
              onPress={() => {
                setIsChatMode(false);
                setSelectedCategory(null);
              }}
              style={styles.toggleButton}
              scaleValue={0.97}
            >
              <LinearGradient
                colors={
                  !isChatMode
                    ? ["#32B8DE", "#A4D233"]
                    : isDarkMode
                      ? ["rgba(55, 65, 81, 0.8)", "rgba(55, 65, 81, 0.8)"]
                      : ["rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.8)"]
                }
                style={styles.toggleGradient}
              >
                <Ionicons
                  name="book"
                  size={20}
                  color={
                    !isChatMode ? "white" : isDarkMode ? "#D1D5DB" : "#374151"
                  }
                />
                <Text
                  style={[
                    styles.toggleText,
                    {
                      color: !isChatMode
                        ? "white"
                        : isDarkMode
                          ? "#D1D5DB"
                          : "#374151",
                    },
                  ]}
                >
                  Унших
                </Text>
              </LinearGradient>
            </PressableScale>

            <PressableScale
              onPress={() => {
                setIsChatMode(true);
                setSelectedCategory(null);
              }}
              style={styles.toggleButton}
              scaleValue={0.97}
            >
              <LinearGradient
                colors={
                  isChatMode
                    ? ["#DB307A", "#8F1D80"]
                    : isDarkMode
                      ? ["rgba(55, 65, 81, 0.8)", "rgba(55, 65, 81, 0.8)"]
                      : ["rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.8)"]
                }
                style={styles.toggleGradient}
              >
                <Ionicons
                  name="chatbubbles"
                  size={20}
                  color={
                    isChatMode ? "white" : isDarkMode ? "#D1D5DB" : "#374151"
                  }
                />
                <Text
                  style={[
                    styles.toggleText,
                    {
                      color: isChatMode
                        ? "white"
                        : isDarkMode
                          ? "#D1D5DB"
                          : "#374151",
                    },
                  ]}
                >
                  Чат
                </Text>
              </LinearGradient>
            </PressableScale>
          </View>
        </View>

        {/* Reading Mode - Category List */}
        {!isChatMode && !selectedCategory && (
          <View style={styles.categoriesContainer}>
            {categories.map((category, index) => (
              <AnimatedCard key={category.id} delay={index * 70}>
                <PressableScale
                  onPress={() => setSelectedCategory(category.id)}
                  scaleValue={0.97}
                >
                  <LinearGradient
                    colors={
                      isDarkMode
                        ? [`${category.color}25`, `${category.color}10`]
                        : [`${category.color}15`, `${category.color}05`]
                    }
                    style={[
                      styles.categoryCard,
                      {
                        backgroundColor: isDarkMode
                          ? "rgba(31, 41, 55, 0.9)"
                          : "rgba(255, 255, 255, 0.9)",
                        borderLeftColor: category.color,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.categoryIcon,
                        {
                          backgroundColor: `${category.color}40`,
                          borderColor: isDarkMode ? category.color : "white",
                        },
                      ]}
                    >
                      <Text style={styles.categoryIconText}>{category.icon}</Text>
                    </View>
                    <View style={styles.categoryContent}>
                      <Text
                        style={[styles.categoryTitle, { color: category.color }]}
                      >
                        {category.title}
                      </Text>
                      <Text
                        style={[
                          styles.categorySubtitle,
                          { color: isDarkMode ? "#D1D5DB" : "#4B5563" },
                        ]}
                      >
                        Дэлгэрэнгүй унших →
                      </Text>
                    </View>
                  </LinearGradient>
                </PressableScale>
              </AnimatedCard>
            ))}
          </View>
        )}

        {/* Category Detail View */}
        {!isChatMode && selectedCategory && selectedCat && (
          <View style={styles.detailContainer}>
            <PressableScale
              onPress={() => setSelectedCategory(null)}
              style={styles.backButton}
              scaleValue={0.98}
            >
              <Ionicons
                name="arrow-back"
                size={20}
                color={isDarkMode ? "#E5E7EB" : "#374151"}
              />
              <Text
                style={[
                  styles.backText,
                  { color: isDarkMode ? "#E5E7EB" : "#374151" },
                ]}
              >
                Буцах
              </Text>
            </PressableScale>

            <AnimatedCard delay={120} bounce>
              <View
                style={[
                  styles.detailCard,
                  {
                    backgroundColor: isDarkMode
                      ? "rgba(31, 41, 55, 0.9)"
                      : "rgba(255, 255, 255, 0.8)",
                  },
                ]}
              >
                <View style={styles.detailHeader}>
                  <Text style={styles.detailIcon}>{selectedCat.icon}</Text>
                  <Text
                    style={[styles.detailTitle, { color: selectedCat.color }]}
                  >
                    {selectedCat.title}
                  </Text>
                </View>
                <View style={styles.detailContent}>
                  {selectedCat.content.map((text, index) => (
                    <Text
                      key={index}
                      style={[
                        styles.detailText,
                        index === 0 && styles.detailTextBold,
                        { color: isDarkMode ? "#E5E7EB" : "#1F2937" },
                      ]}
                    >
                      {text}
                    </Text>
                  ))}
                </View>
              </View>
            </AnimatedCard>
          </View>
        )}

        {/* Chat Mode */}
        {isChatMode && (
          <View style={styles.chatContainer}>
            <AnimatedCard delay={120}>
              <View
                style={[
                  styles.messagesContainer,
                  {
                    backgroundColor: isDarkMode
                      ? "rgba(31, 41, 55, 0.8)"
                      : "rgba(255, 255, 255, 0.7)",
                  },
                ]}
              >
                <ScrollView showsVerticalScrollIndicator={false}>
                  {messages.map((message, index) => (
                    <View
                      key={index}
                      style={[
                        styles.messageWrapper,
                        message.isUser
                          ? styles.messageWrapperUser
                          : styles.messageWrapperAI,
                      ]}
                    >
                      <LinearGradient
                        colors={
                          message.isUser
                            ? ["#DB307A", "#8F1D80"]
                            : isDarkMode
                              ? [
                                  "rgba(50, 184, 222, 0.4)",
                                  "rgba(164, 210, 51, 0.4)",
                                ]
                              : [
                                  "rgba(50, 184, 222, 0.2)",
                                  "rgba(164, 210, 51, 0.2)",
                                ]
                        }
                        style={[
                          styles.messageBubble,
                          isDarkMode &&
                            !message.isUser && {
                              borderWidth: 2,
                              borderColor: "rgba(75, 85, 99, 1)",
                            },
                        ]}
                      >
                        <Text
                          style={[
                            styles.messageText,
                            {
                              color: message.isUser
                                ? "white"
                                : isDarkMode
                                  ? "#F3F4F6"
                                  : "#1F2937",
                            },
                          ]}
                        >
                          {message.text}
                        </Text>
                      </LinearGradient>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </AnimatedCard>

            <View style={styles.inputContainer}>
              <TextInput
                value={inputMessage}
                onChangeText={setInputMessage}
                placeholder="Асуултаа бичнэ үү..."
                placeholderTextColor={isDarkMode ? "#9CA3AF" : "#6B7280"}
                editable={!isSending}
                style={[
                  styles.input,
                  {
                    backgroundColor: isDarkMode
                      ? "rgba(55, 65, 81, 0.8)"
                      : "rgba(255, 255, 255, 0.8)",
                    color: isDarkMode ? "white" : "#1F2937",
                    borderColor: isDarkMode
                      ? "#4B5563"
                      : "rgba(255, 255, 255, 0.9)",
                  },
                ]}
                onSubmitEditing={handleSendMessage}
              />
              <PressableScale onPress={canSend ? handleSendMessage : undefined} scaleValue={0.92}>
                <LinearGradient
                  colors={["#FFE700", "#FF9800"]}
                  style={[styles.sendButton, !canSend && styles.sendButtonDisabled]}
                >
                  <Ionicons name="send" size={24} color="white" />
                </LinearGradient>
              </PressableScale>
            </View>
          </View>
        )}
      </ScrollView>
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
    padding: 16,
    paddingTop: 60,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  headerEmoji: {
    fontSize: 32,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  toggleRow: {
    flexDirection: "row",
    gap: 12,
  },
  toggleButton: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
  },
  toggleGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "transparent",
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  categoryCard: {
    flexDirection: "row",
    padding: 24,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: "white",
    borderLeftWidth: 8,
    marginBottom: 12,
    gap: 16,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryIconText: {
    fontSize: 40,
  },
  categoryContent: {
    flex: 1,
    justifyContent: "center",
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 12,
    fontWeight: "600",
  },
  detailContainer: {
    paddingHorizontal: 16,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  backText: {
    fontSize: 14,
    fontWeight: "600",
  },
  detailCard: {
    padding: 24,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.9)",
  },
  detailHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  detailIcon: {
    fontSize: 40,
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  detailContent: {
    gap: 12,
  },
  detailText: {
    fontSize: 14,
    lineHeight: 20,
  },
  detailTextBold: {
    fontSize: 16,
    fontWeight: "600",
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContainer: {
    height: 400,
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
  },
  messageWrapper: {
    marginBottom: 12,
  },
  messageWrapperUser: {
    alignItems: "flex-end",
  },
  messageWrapperAI: {
    alignItems: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
  },
  messageText: {
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    gap: 8,
    paddingBottom: 8,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 2,
    fontSize: 14,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
