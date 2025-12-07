import { StyleSheet } from 'react-native';

// Theme colors (university palette)
export const theme = {
  primaryBlue: '#0B57D0',
  accentRed: '#D62828',
  accentYellow: '#FFD166',
  foundGreen: '#28A745',
  neutralLight: '#f8f9fa',
  neutral: '#f2f2f2',
  text: 'rgba(0,0,0,0.85)'
};

export const welcomeStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    paddingBottom: 36,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 36,
    alignItems: 'stretch',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 12,
  },
  titleBlock: {
    flex: 1,
    alignItems: 'center',
  },
  titleInline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  subtitleInline: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.accentYellow,
    marginLeft: 8,
    marginRight: 8,
    alignSelf: 'center',
    marginBottom: 0,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 0,
    textShadowColor: 'rgba(0,0,0,0.45)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    color: theme.accentYellow,
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: theme.primaryBlue,
    marginTop: 6,
    marginBottom: 12,
    width: '60%',
    alignSelf: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginLeft: -30,
    marginTop: 15,
    resizeMode: 'contain',
  },
  description : {
    fontSize: 15,
    lineHeight: 20,
    color: 'rgba(255,255,255,0.95)',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 16,
  },
  featuresContainer: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    width: '100%',
    alignSelf: 'stretch',
    marginHorizontal: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
  },
  feature: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.95)',
    marginVertical: 5,
  },
  howItWorks: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    width: '100%',
    alignSelf: 'stretch',
    marginHorizontal: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  howTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
  },
  howStep: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.92)',
    marginVertical: 5,
  },
  buttonContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 26,
    zIndex: 40,
  },
  // CTA button for welcome screen (full-width)
  ctaButtonFull: {
    backgroundColor: theme.primaryBlue,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 999,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
  // subtle overlay when using background image
  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.48)'
  },
});

export const addItemStyles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'transparent' },
  label: { fontWeight: '700', marginTop: 12, marginBottom: 8, color: '#fff' },
  input: { borderWidth: 0, padding: 12, borderRadius: 10, marginBottom: 12, backgroundColor: 'rgba(255,255,255,0.96)', color: '#111', shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: {width:0,height:4}, shadowRadius: 8, elevation: 3 },
  statusContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 12 },
  btn: { flex: 1, padding: 12, alignItems: 'center', marginHorizontal: 5, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.96)', shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: {width:0,height:4}, shadowRadius: 8 },
  activeLost: { backgroundColor: theme.accentRed, borderColor: theme.accentRed },
  activeFound: { backgroundColor: theme.foundGreen, borderColor: theme.foundGreen },
  btnText: { fontWeight: '700', color: theme.primaryBlue },
  imageContainer: { alignItems: 'center', marginVertical: 15 },
  imagePreview: { width: 200, height: 200, borderRadius: 10, marginBottom: 10 },
  removeImageBtn: { backgroundColor: '#d9534f', padding: 10, borderRadius: 6 },
  removeImageText: { color: '#fff', fontWeight: '700' },
  uploadBtn: { backgroundColor: theme.primaryBlue, padding: 14, borderRadius: 999, alignItems: 'center', marginBottom: 20, marginTop: 10, elevation: 4 },
  uploadBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});

export const detailStyles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'transparent' },
  detailImage: { width: '100%', height: 320, borderRadius: 12, marginBottom: 20 },
  status: { color: theme.primaryBlue, textTransform: 'uppercase', fontSize: 12, fontWeight: '700' },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 8, color: '#fff' },
  desc: { fontSize: 16, marginBottom: 20, lineHeight: 24, color: 'rgba(255,255,255,0.95)' },
  contact: { fontSize: 14, fontStyle: 'italic', marginBottom: 30, color: 'rgba(255,255,255,0.9)' },
  input: { borderWidth: 0, padding: 12, borderRadius: 10, marginBottom: 10, backgroundColor: 'rgba(255,255,255,0.96)', color: '#111' },
  label: { fontWeight: '700', marginBottom: 5, color: '#fff' }
});

export const homeStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent', padding: 14 },
  searchContainer: { paddingVertical: 6, paddingHorizontal: 6 },
  searchInput: { backgroundColor: 'rgba(255,255,255,0.96)', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, borderWidth: 0, color: '#222', fontWeight: '600', fontSize: 14, shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: {width:0,height:4}, shadowRadius: 8, elevation: 3 },
  searchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 6 },
  refreshBtn: { marginLeft: 8, backgroundColor: 'rgba(255,255,255,0.96)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: {width:0,height:4}, shadowRadius: 8 },
  refreshBtnText: { color: theme.primaryBlue, fontWeight: '700' },
  cardRow: { position: 'relative', backgroundColor: 'rgba(255,255,255,0.96)', padding: 12, marginBottom: 12, borderRadius: 14, elevation: 3, flexDirection: 'row', alignItems: 'flex-start', shadowColor: '#000', shadowOpacity: 0.08, shadowOffset: {width:0,height:6}, shadowRadius: 12, minHeight: 76 },
  leftThumbWrap: { marginRight: 12 },
  thumb: { width: 78, height: 78, borderRadius: 10, backgroundColor: '#eee' },
  contentRight: { flex: 1, justifyContent: 'center' },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: '700', color: '#111', flex: 1 },
  badge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, overflow: 'hidden', color: '#fff', fontSize: 12, marginLeft: 'auto', textAlign: 'center', fontWeight: '700', alignSelf: 'flex-start' },
  lost: { backgroundColor: theme.accentRed },
  found: { backgroundColor: theme.foundGreen },
  subtitle: { color: '#666', marginTop: 6 },
  date: { color: '#999', fontSize: 12, marginTop: 8 },
  cardNoImage: { position: 'relative', backgroundColor: 'rgba(255,255,255,0.96)', padding: 12, marginBottom: 12, borderRadius: 14, elevation: 3, shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: {width:0,height:4}, shadowRadius: 8, minHeight: 76, justifyContent: 'flex-start' },
  cardLabel: { fontSize: 12, color: '#666', fontWeight: '600', marginTop: 8, marginBottom: 2 },
  cardValue: { fontSize: 16, fontWeight: '700', color: '#111' },
  cardDate: { fontSize: 12, color: '#999', marginBottom: 0 },
  statusBadgeText: { fontWeight: '700', fontSize: 12, color: '#fff' },
  lostText: { color: theme.accentRed },
  foundText: { color: theme.foundGreen },

  // New: pill-style status used inside cards (clean, modern)
  statusPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusPillText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 12,
  },
  lostPill: { backgroundColor: theme.accentRed },
  foundPill: { backgroundColor: theme.foundGreen },
  // Detail screen pill (larger, placed over image)
  detailStatusPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    elevation: 8,
    shadowColor: '#ffffffff',
    shadowOpacity: 0.28,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)'
  },
  detailStatusPillText: { color: '#fff', fontWeight: '900', fontSize: 15, letterSpacing: 0.6, textTransform: 'uppercase' },
  detailLost: { backgroundColor: '#B71C1C' },
  detailFound: { backgroundColor: '#196F3D' },
  detailPillAbsolute: { position: 'absolute', top: 12, left: 12, zIndex: 40 },
  // absolute placement helper for pills (top-right)
  statusAbsolute: { position: 'absolute', top: 8, right: 12, zIndex: 10 },
  // outline variants (if you prefer outline pill)
  lostPillOutline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: theme.accentRed },
  foundPillOutline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: theme.foundGreen },
  statusPillTextOutline: { color: theme.primaryBlue, fontWeight: '800', fontSize: 12 },
});

export default {
  welcomeStyles,
  addItemStyles,
  detailStyles,
  homeStyles,
};

